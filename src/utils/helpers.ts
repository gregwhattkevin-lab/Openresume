export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function formatDateRange(startDate: string, endDate: string, current: boolean = false): string {
  if (!startDate && !endDate) return ''
  const end = current ? 'Present' : endDate
  if (!startDate) return end
  if (!end) return startDate
  return `${startDate} - ${end}`
}

export function moveItem<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const newArray = [...array]
  const [movedItem] = newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, movedItem)
  return newArray
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function resizeImage(file: File, maxWidth = 400, maxHeight = 400): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const reader = new FileReader()
    reader.onload = (e) => {
      img.src = e.target?.result as string
      img.onload = () => {
        let { width, height } = img
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.onerror = reject
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
