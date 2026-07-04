import { useRef, useEffect, useCallback } from 'react'
import { Icon } from './Icon'
import { sanitizeHTML } from '../utils/sanitize'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

const emptyBullet = '<ul><li></li></ul>'

export function RichTextEditor({ value, onChange, placeholder, rows = 4 }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isEditingRef = useRef(false)

  useEffect(() => {
    const el = editorRef.current
    if (!el || isEditingRef.current) return
    const newValue = value || emptyBullet
    if (el.innerHTML !== newValue) {
      el.innerHTML = sanitizeHTML(newValue)
    }
  }, [value])

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      onChange(html === emptyBullet || html === '<ul><li><br></li></ul>' ? '' : sanitizeHTML(html))
    }
  }, [onChange])

  const exec = useCallback((command: string, valueArg: string = '') => {
    document.execCommand(command, false, valueArg)
    handleInput()
    editorRef.current?.focus()
  }, [handleInput])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      exec('insertUnorderedList')
    }
  }, [exec])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    if (text) {
      document.execCommand('insertText', false, text)
    }
  }, [])

  const handleFocus = useCallback(() => {
    isEditingRef.current = true
  }, [])

  const handleBlur = useCallback(() => {
    isEditingRef.current = false
    handleInput()
  }, [handleInput])

  return (
    <div className="border border-slate-200 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-teal-500/30 focus-within:border-teal-600 bg-white">
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-slate-100 bg-slate-50">
        <button
          type="button"
          onClick={() => exec('bold')}
          className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors"
          title="Bold"
        >
          <Icon name="bold" size={14} />
        </button>
        <button
          type="button"
          onClick={() => exec('italic')}
          className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors"
          title="Italic"
        >
          <Icon name="italic" size={14} />
        </button>
        <button
          type="button"
          onClick={() => exec('insertUnorderedList')}
          className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors"
          title="Bullet list"
        >
          <Icon name="list" size={14} />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        className="editor-textarea min-h-[80px] border-0 focus:ring-0"
        style={{ minHeight: `${rows * 24}px` }}
      />
    </div>
  )
}
