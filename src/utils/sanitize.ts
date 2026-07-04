export function sanitizeHTML(input: string): string {
  if (!input) return ''

  try {
    const doc = new DOMParser().parseFromString(input, 'text/html')
    cleanNode(doc.body)
    return doc.body.innerHTML
  } catch {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/ on\w+\s*=\s*"[^"]*"/gi, '')
      .replace(/ on\w+\s*=\s*'[^']*'/gi, '')
      .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
      .replace(/<object\b[^>]*>[\s\S]*?<\/object>/gi, '')
  }
}

const ALLOWED_TAGS = new Set([
  'B', 'I', 'STRONG', 'EM', 'U', 'S', 'UL', 'OL', 'LI',
  'P', 'BR', 'SPAN', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
  'A', 'BLOCKQUOTE', 'PRE', 'CODE', 'HR',
])

function cleanNode(node: Node) {
  if (node.nodeType === Node.COMMENT_NODE) {
    node.parentNode?.removeChild(node)
    return
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as Element

    // Remove dangerous elements
    if (!ALLOWED_TAGS.has(el.tagName) || el.tagName === 'SCRIPT' || el.tagName === 'IFRAME' || el.tagName === 'OBJECT' || el.tagName === 'EMBED' || el.tagName === 'FORM') {
      while (el.firstChild) {
        el.parentNode?.insertBefore(el.firstChild, el)
      }
      el.parentNode?.removeChild(el)
      return
    }

    // Remove dangerous attributes
    for (let i = el.attributes.length - 1; i >= 0; i--) {
      const attr = el.attributes[i]
      const attrValue = attr.name.toLowerCase()
      if (
        attrValue.startsWith('on') ||
        (attr.name === 'href' && /^\s*javascript:/i.test(attr.value)) ||
        (attr.name === 'src' && /^\s*javascript:/i.test(attr.value))
      ) {
        el.removeAttribute(attr.name)
      }
    }

    // Clean A tags
    if (el.tagName === 'A') {
      const href = el.getAttribute('href')
      if (href && /^\s*javascript:/i.test(href)) {
        el.removeAttribute('href')
      }
      el.setAttribute('rel', 'noreferrer noopener')
      el.setAttribute('target', '_blank')
    }

    // Recursively clean children
    const children = Array.from(el.childNodes)
    for (const child of children) {
      cleanNode(child)
    }
  }
}
