import { useRef, useEffect } from 'react'
import { Icon } from './Icon'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export function RichTextEditor({ value, onChange, placeholder, rows = 4 }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '<ul><li></li></ul>'
    }
  }, [value])

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      onChange(html === '<ul><li></li></ul>' || html === '<ul><li><br></li></ul>' ? '' : html)
    }
  }

  const exec = (command: string, valueArg: string = '') => {
    document.execCommand(command, false, valueArg)
    handleInput()
    editorRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      exec('insertUnorderedList')
    }
  }

  return (
    <div className="border border-slate-200 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-teal-500/30 focus-within:border-teal-600 bg-white">
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-slate-100 bg-slate-50">
        <button
          type="button"
          onClick={() => exec('bold')}
          className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors"
          title="Negrita"
        >
          <Icon name="bold" size={14} />
        </button>
        <button
          type="button"
          onClick={() => exec('italic')}
          className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors"
          title="Cursiva"
        >
          <Icon name="italic" size={14} />
        </button>
        <button
          type="button"
          onClick={() => exec('insertUnorderedList')}
          className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors"
          title="Lista con viñetas"
        >
          <Icon name="list" size={14} />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        className="editor-textarea min-h-[80px] border-0 focus:ring-0"
        style={{ minHeight: `${rows * 24}px` }}
      />
    </div>
  )
}
