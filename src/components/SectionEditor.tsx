import type { CVData, SectionKey, SectionDef } from '../types/cv'
import { RichTextEditor } from './RichTextEditor'
import { Icon } from './Icon'
import { generateId, resizeImage } from '../utils/helpers'

interface SectionEditorProps {
  cv: CVData
  setCv: React.Dispatch<React.SetStateAction<CVData>>
  activeSection: SectionKey
  sections: SectionDef[]
  onNext: () => void
  onBack: () => void
  onOpenReorder: () => void
}

export function SectionEditor({
  cv,
  setCv,
  activeSection,
  sections,
  onNext,
  onBack,
  onOpenReorder,
}: SectionEditorProps) {
  const section = sections.find((s) => s.key === activeSection)
  const activeIndex = sections.findIndex((s) => s.key === activeSection)
  const isFirst = activeIndex === 0
  const isLast = activeIndex === sections.length - 1

  const updatePersonal = (field: keyof CVData['personalInfo'], value: string) => {
    setCv((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }))
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido.')
      return
    }
    try {
      const base64 = await resizeImage(file, 400, 400)
      updatePersonal('photo', base64)
    } catch {
      alert('Error al procesar la imagen.')
    }
  }

  const updateArrayItem = <T extends { id: string }>(
    sectionKey: keyof CVData,
    id: string,
    field: string,
    value: string | boolean
  ) => {
    setCv((prev) => ({
      ...prev,
      [sectionKey]: ((prev[sectionKey] as unknown) as T[]).map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }))
  }

  const addItem = <T extends { id: string }>(sectionKey: keyof CVData, newItem: T) => {
    setCv((prev) => ({ ...prev, [sectionKey]: [...((prev[sectionKey] as unknown) as T[]), newItem] }))
  }

  const removeItem = <T extends { id: string }>(sectionKey: keyof CVData, id: string) => {
    setCv((prev) => ({ ...prev, [sectionKey]: ((prev[sectionKey] as unknown) as T[]).filter((item) => item.id !== id) }))
  }

  const moveItem = <T extends { id: string }>(sectionKey: keyof CVData, index: number, direction: 'up' | 'down') => {
    setCv((prev) => {
      const array = (prev[sectionKey] as unknown) as T[]
      const newIndex = direction === 'up' ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= array.length) return prev
      const newArray = [...array]
      const [moved] = newArray.splice(index, 1)
      newArray.splice(newIndex, 0, moved)
      return { ...prev, [sectionKey]: newArray }
    })
  }

  const removeSection = (key: string) => {
    setCv((prev) => ({
      ...prev,
      sectionOrder: prev.sectionOrder.filter((k) => k !== key),
      customSections: prev.customSections.filter((s) => s.key !== key),
    }))
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                {cv.personalInfo.photo ? (
                  <img src={cv.personalInfo.photo} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-slate-200" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                    <Icon name="user" size={28} />
                  </div>
                )}
              </div>
              <div>
                <label className="btn-secondary cursor-pointer">
                  <Icon name="upload" size={14} />
                  Upload photo
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
                {cv.personalInfo.photo && (
                  <button
                    type="button"
                    onClick={() => updatePersonal('photo', '')}
                    className="ml-2 text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name" value={cv.personalInfo.firstName} onChange={(v) => updatePersonal('firstName', v)} />
              <Field label="Last name" value={cv.personalInfo.lastName} onChange={(v) => updatePersonal('lastName', v)} />
            </div>
            <Field label="Desired job title" value={cv.personalInfo.title} onChange={(v) => updatePersonal('title', v)} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Email" value={cv.personalInfo.email} onChange={(v) => updatePersonal('email', v)} />
              <Field label="Phone" value={cv.personalInfo.phone} onChange={(v) => updatePersonal('phone', v)} />
            </div>
            <Field label="Location" value={cv.personalInfo.location} onChange={(v) => updatePersonal('location', v)} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="LinkedIn" value={cv.personalInfo.linkedin} onChange={(v) => updatePersonal('linkedin', v)} />
              <Field label="Website" value={cv.personalInfo.website} onChange={(v) => updatePersonal('website', v)} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Birth date" value={cv.personalInfo.birthDate} onChange={(v) => updatePersonal('birthDate', v)} />
              <Field label="Nationality" value={cv.personalInfo.nationality} onChange={(v) => updatePersonal('nationality', v)} />
              <Field label="Driver license" value={cv.personalInfo.drivingLicense} onChange={(v) => updatePersonal('drivingLicense', v)} />
            </div>
          </div>
        )

      case 'summary':
        return (
          <div>
            <RichTextEditor
              value={cv.personalInfo.summary}
              onChange={(value) => updatePersonal('summary', value)}
              placeholder="Write a short professional summary..."
              rows={6}
            />
          </div>
        )

      case 'experience':
        return (
          <div className="space-y-4">
            {cv.experiences.map((exp, index) => (
              <div key={exp.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Experience {index + 1}</span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => moveItem('experiences', index, 'up')} disabled={index === 0} className="btn-ghost disabled:opacity-30"><Icon name="chevronUp" size={14} /></button>
                    <button type="button" onClick={() => moveItem('experiences', index, 'down')} disabled={index === cv.experiences.length - 1} className="btn-ghost disabled:opacity-30"><Icon name="chevronDown" size={14} /></button>
                    <button type="button" onClick={() => removeItem('experiences', exp.id)} className="btn-ghost text-red-500 hover:bg-red-50"><Icon name="trash2" size={14} /></button>
                  </div>
                </div>
                <Field label="Job title" value={exp.title} onChange={(v) => updateArrayItem('experiences', exp.id, 'title', v)} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Company" value={exp.company} onChange={(v) => updateArrayItem('experiences', exp.id, 'company', v)} />
                  <Field label="Location" value={exp.location} onChange={(v) => updateArrayItem('experiences', exp.id, 'location', v)} />
                </div>
                <div className="grid grid-cols-3 gap-4 items-end">
                  <Field label="Start date" value={exp.startDate} onChange={(v) => updateArrayItem('experiences', exp.id, 'startDate', v)} />
                  <Field label="End date" value={exp.endDate} onChange={(v) => updateArrayItem('experiences', exp.id, 'endDate', v)} disabled={exp.current} />
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" checked={exp.current} onChange={(e) => updateArrayItem('experiences', exp.id, 'current', e.target.checked)} className="rounded border-slate-300 text-blue-600" />
                    Current
                  </label>
                </div>
                <div>
                  <label className="editor-label">Description</label>
                  <RichTextEditor value={exp.description} onChange={(v) => updateArrayItem('experiences', exp.id, 'description', v)} rows={3} />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('experiences', { id: generateId(), title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '<ul><li></li></ul>' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="plus" size={16} /> Add experience
            </button>
          </div>
        )

      case 'education':
        return (
          <div className="space-y-4">
            {cv.education.map((edu, index) => (
              <div key={edu.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Education {index + 1}</span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => moveItem('education', index, 'up')} disabled={index === 0} className="btn-ghost disabled:opacity-30"><Icon name="chevronUp" size={14} /></button>
                    <button type="button" onClick={() => moveItem('education', index, 'down')} disabled={index === cv.education.length - 1} className="btn-ghost disabled:opacity-30"><Icon name="chevronDown" size={14} /></button>
                    <button type="button" onClick={() => removeItem('education', edu.id)} className="btn-ghost text-red-500 hover:bg-red-50"><Icon name="trash2" size={14} /></button>
                  </div>
                </div>
                <Field label="Degree" value={edu.degree} onChange={(v) => updateArrayItem('education', edu.id, 'degree', v)} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="School" value={edu.school} onChange={(v) => updateArrayItem('education', edu.id, 'school', v)} />
                  <Field label="Location" value={edu.location} onChange={(v) => updateArrayItem('education', edu.id, 'location', v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Start date" value={edu.startDate} onChange={(v) => updateArrayItem('education', edu.id, 'startDate', v)} />
                  <Field label="End date" value={edu.endDate} onChange={(v) => updateArrayItem('education', edu.id, 'endDate', v)} />
                </div>
                <Field label="Description" value={edu.description} onChange={(v) => updateArrayItem('education', edu.id, 'description', v)} />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('education', { id: generateId(), degree: '', school: '', location: '', startDate: '', endDate: '', description: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="plus" size={16} /> Add education
            </button>
          </div>
        )

      case 'courses':
        return (
          <div className="space-y-4">
            {cv.courses.map((course) => (
              <div key={course.id} className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="grid grid-cols-6 gap-3 items-end">
                  <div className="col-span-3">
                    <Field label="Course" value={course.name} onChange={(v) => updateArrayItem('courses', course.id, 'name', v)} />
                  </div>
                  <div className="col-span-2">
                    <Field label="Institution" value={course.institution} onChange={(v) => updateArrayItem('courses', course.id, 'institution', v)} />
                  </div>
                  <div className="col-span-1">
                    <Field label="Year" value={course.date} onChange={(v) => updateArrayItem('courses', course.id, 'date', v)} />
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button type="button" onClick={() => removeItem('courses', course.id)} className="btn-ghost text-red-500 hover:bg-red-50"><Icon name="trash2" size={14} /> Remove</button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('courses', { id: generateId(), name: '', institution: '', date: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="plus" size={16} /> Add course
            </button>
          </div>
        )

      case 'skills':
        return (
          <div className="space-y-3">
            {cv.skills.map((skill, index) => (
              <div key={skill.id} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1">
                  <Field label="" value={skill.name} onChange={(v) => updateArrayItem('skills', skill.id, 'name', v)} placeholder="Skill name" />
                </div>
                <div className="w-36">
                  <select value={skill.level} onChange={(e) => updateArrayItem('skills', skill.id, 'level', e.target.value)} className="editor-input">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => moveItem('skills', index, 'up')} disabled={index === 0} className="btn-ghost disabled:opacity-30"><Icon name="chevronUp" size={14} /></button>
                  <button type="button" onClick={() => moveItem('skills', index, 'down')} disabled={index === cv.skills.length - 1} className="btn-ghost disabled:opacity-30"><Icon name="chevronDown" size={14} /></button>
                  <button type="button" onClick={() => removeItem('skills', skill.id)} className="btn-ghost text-red-500 hover:bg-red-50"><Icon name="trash2" size={14} /></button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('skills', { id: generateId(), name: '', level: 'Intermediate' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="plus" size={16} /> Add skill
            </button>
          </div>
        )

      case 'languages':
        return (
          <div className="space-y-3">
            {cv.languages.map((lang, index) => (
              <div key={lang.id} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1">
                  <Field label="" value={lang.name} onChange={(v) => updateArrayItem('languages', lang.id, 'name', v)} placeholder="Language" />
                </div>
                <div className="w-40">
                  <select value={lang.level} onChange={(e) => updateArrayItem('languages', lang.id, 'level', e.target.value)} className="editor-input">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Native">Native</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => moveItem('languages', index, 'up')} disabled={index === 0} className="btn-ghost disabled:opacity-30"><Icon name="chevronUp" size={14} /></button>
                  <button type="button" onClick={() => moveItem('languages', index, 'down')} disabled={index === cv.languages.length - 1} className="btn-ghost disabled:opacity-30"><Icon name="chevronDown" size={14} /></button>
                  <button type="button" onClick={() => removeItem('languages', lang.id)} className="btn-ghost text-red-500 hover:bg-red-50"><Icon name="trash2" size={14} /></button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('languages', { id: generateId(), name: '', level: 'Intermediate' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="plus" size={16} /> Add language
            </button>
          </div>
        )

      case 'hobbies':
        return (
          <div className="space-y-3">
            {cv.hobbies.map((hobby, index) => (
              <div key={hobby.id} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1">
                  <Field label="" value={hobby.name} onChange={(v) => updateArrayItem('hobbies', hobby.id, 'name', v)} placeholder="Hobby" />
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => moveItem('hobbies', index, 'up')} disabled={index === 0} className="btn-ghost disabled:opacity-30"><Icon name="chevronUp" size={14} /></button>
                  <button type="button" onClick={() => moveItem('hobbies', index, 'down')} disabled={index === cv.hobbies.length - 1} className="btn-ghost disabled:opacity-30"><Icon name="chevronDown" size={14} /></button>
                  <button type="button" onClick={() => removeItem('hobbies', hobby.id)} className="btn-ghost text-red-500 hover:bg-red-50"><Icon name="trash2" size={14} /></button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('hobbies', { id: generateId(), name: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="plus" size={16} /> Add hobby
            </button>
          </div>
        )

      case 'volunteering':
        return (
          <div className="space-y-4">
            {cv.volunteering.map((vol, index) => (
              <div key={vol.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Volunteering {index + 1}</span>
                  <button type="button" onClick={() => removeItem('volunteering', vol.id)} className="btn-ghost text-red-500 hover:bg-red-50"><Icon name="trash2" size={14} /></button>
                </div>
                <Field label="Role" value={vol.role} onChange={(v) => updateArrayItem('volunteering', vol.id, 'role', v)} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Organization" value={vol.organization} onChange={(v) => updateArrayItem('volunteering', vol.id, 'organization', v)} />
                  <Field label="Location" value={vol.location} onChange={(v) => updateArrayItem('volunteering', vol.id, 'location', v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Start date" value={vol.startDate} onChange={(v) => updateArrayItem('volunteering', vol.id, 'startDate', v)} />
                  <Field label="End date" value={vol.endDate} onChange={(v) => updateArrayItem('volunteering', vol.id, 'endDate', v)} />
                </div>
                <Field label="Description" value={vol.description} onChange={(v) => updateArrayItem('volunteering', vol.id, 'description', v)} />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('volunteering', { id: generateId(), role: '', organization: '', location: '', startDate: '', endDate: '', description: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="plus" size={16} /> Add volunteering
            </button>
          </div>
        )

      case 'internships':
        return (
          <div className="space-y-4">
            {cv.internships.map((intern, index) => (
              <div key={intern.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Internship {index + 1}</span>
                  <button type="button" onClick={() => removeItem('internships', intern.id)} className="btn-ghost text-red-500 hover:bg-red-50"><Icon name="trash2" size={14} /></button>
                </div>
                <Field label="Title" value={intern.title} onChange={(v) => updateArrayItem('internships', intern.id, 'title', v)} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Company" value={intern.company} onChange={(v) => updateArrayItem('internships', intern.id, 'company', v)} />
                  <Field label="Location" value={intern.location} onChange={(v) => updateArrayItem('internships', intern.id, 'location', v)} />
                </div>
                <div className="grid grid-cols-3 gap-4 items-end">
                  <Field label="Start date" value={intern.startDate} onChange={(v) => updateArrayItem('internships', intern.id, 'startDate', v)} />
                  <Field label="End date" value={intern.endDate} onChange={(v) => updateArrayItem('internships', intern.id, 'endDate', v)} disabled={intern.current} />
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" checked={intern.current} onChange={(e) => updateArrayItem('internships', intern.id, 'current', e.target.checked)} className="rounded border-slate-300 text-blue-600" />
                    Current
                  </label>
                </div>
                <div>
                  <label className="editor-label">Description</label>
                  <RichTextEditor value={intern.description} onChange={(v) => updateArrayItem('internships', intern.id, 'description', v)} rows={3} />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('internships', { id: generateId(), title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '<ul><li></li></ul>' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="plus" size={16} /> Add internship
            </button>
          </div>
        )

      case 'references':
        return (
          <div className="space-y-4">
            {cv.references.map((ref, index) => (
              <div key={ref.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Reference {index + 1}</span>
                  <button type="button" onClick={() => removeItem('references', ref.id)} className="btn-ghost text-red-500 hover:bg-red-50"><Icon name="trash2" size={14} /></button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Name" value={ref.name} onChange={(v) => updateArrayItem('references', ref.id, 'name', v)} />
                  <Field label="Company" value={ref.company} onChange={(v) => updateArrayItem('references', ref.id, 'company', v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Phone" value={ref.phone} onChange={(v) => updateArrayItem('references', ref.id, 'phone', v)} />
                  <Field label="Email" value={ref.email} onChange={(v) => updateArrayItem('references', ref.id, 'email', v)} />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('references', { id: generateId(), name: '', company: '', phone: '', email: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="plus" size={16} /> Add reference
            </button>
          </div>
        )

      case 'links':
        return (
          <div className="space-y-3">
            {cv.links.map((link, index) => (
              <div key={link.id} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1">
                  <Field label="" value={link.label} onChange={(v) => updateArrayItem('links', link.id, 'label', v)} placeholder="Label (e.g. Portfolio)" />
                </div>
                <div className="flex-[2]">
                  <Field label="" value={link.url} onChange={(v) => updateArrayItem('links', link.id, 'url', v)} placeholder="https://..." />
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => moveItem('links', index, 'up')} disabled={index === 0} className="btn-ghost disabled:opacity-30"><Icon name="chevronUp" size={14} /></button>
                  <button type="button" onClick={() => moveItem('links', index, 'down')} disabled={index === cv.links.length - 1} className="btn-ghost disabled:opacity-30"><Icon name="chevronDown" size={14} /></button>
                  <button type="button" onClick={() => removeItem('links', link.id)} className="btn-ghost text-red-500 hover:bg-red-50"><Icon name="trash2" size={14} /></button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('links', { id: generateId(), label: '', url: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="plus" size={16} /> Add link
            </button>
          </div>
        )

      default:
        // Custom section
        const customSection = cv.customSections.find((s) => s.key === activeSection)
        if (!customSection) return <div className="text-slate-500">Section not found.</div>
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Field label="Section title" value={customSection.title} onChange={(v) => {
                setCv((prev) => ({
                  ...prev,
                  customSections: prev.customSections.map((s) => s.key === activeSection ? { ...s, title: v } : s),
                }))
              }} />
              <button
                type="button"
                onClick={() => removeSection(activeSection)}
                className="ml-4 btn-secondary text-red-600 hover:bg-red-50"
              >
                <Icon name="trash2" size={14} /> Remove section
              </button>
            </div>
            {customSection.items.map((item, index) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Item {index + 1}</span>
                  <button type="button" onClick={() => {
                    setCv((prev) => ({
                      ...prev,
                      customSections: prev.customSections.map((s) => s.key === activeSection ? { ...s, items: s.items.filter((i) => i.id !== item.id) } : s),
                    }))
                  }} className="btn-ghost text-red-500 hover:bg-red-50"><Icon name="trash2" size={14} /></button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Title" value={item.title} onChange={(v) => {
                    setCv((prev) => ({
                      ...prev,
                      customSections: prev.customSections.map((s) => s.key === activeSection ? { ...s, items: s.items.map((i) => i.id === item.id ? { ...i, title: v } : i) } : s),
                    }))
                  }} />
                  <Field label="Subtitle" value={item.subtitle} onChange={(v) => {
                    setCv((prev) => ({
                      ...prev,
                      customSections: prev.customSections.map((s) => s.key === activeSection ? { ...s, items: s.items.map((i) => i.id === item.id ? { ...i, subtitle: v } : i) } : s),
                    }))
                  }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Start date" value={item.startDate} onChange={(v) => {
                    setCv((prev) => ({
                      ...prev,
                      customSections: prev.customSections.map((s) => s.key === activeSection ? { ...s, items: s.items.map((i) => i.id === item.id ? { ...i, startDate: v } : i) } : s),
                    }))
                  }} />
                  <Field label="End date" value={item.endDate} onChange={(v) => {
                    setCv((prev) => ({
                      ...prev,
                      customSections: prev.customSections.map((s) => s.key === activeSection ? { ...s, items: s.items.map((i) => i.id === item.id ? { ...i, endDate: v } : i) } : s),
                    }))
                  }} />
                </div>
                <Field label="Description" value={item.description} onChange={(v) => {
                  setCv((prev) => ({
                    ...prev,
                    customSections: prev.customSections.map((s) => s.key === activeSection ? { ...s, items: s.items.map((i) => i.id === item.id ? { ...i, description: v } : i) } : s),
                  }))
                }} />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setCv((prev) => ({
                  ...prev,
                  customSections: prev.customSections.map((s) => s.key === activeSection ? { ...s, items: [...s.items, { id: generateId(), title: '', subtitle: '', startDate: '', endDate: '', description: '' }] } : s),
                }))
              }}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="plus" size={16} /> Add item
            </button>
          </div>
        )
    }
  }

  if (!section) return null

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 min-w-0">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{section.label}</h1>
          <p className="text-slate-500 mb-8">{section.description}</p>
          {renderSectionContent()}
        </div>
      </div>

      <div className="px-8 py-4 bg-white border-t border-slate-200 flex items-center justify-between">
        <button
          type="button"
          onClick={onOpenReorder}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Icon name="gripVertical" size={16} />
          Reorder sections
        </button>
        <div className="flex items-center gap-3">
          {!isFirst && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Icon name="arrowLeft" size={16} />
              Back
            </button>
          )}
          {!isLast ? (
            <button
              type="button"
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Next
              <Icon name="arrowRight" size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Finish
              <Icon name="check" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}) {
  return (
    <div>
      {label && <label className="editor-label">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="editor-input disabled:bg-slate-100"
      />
    </div>
  )
}
