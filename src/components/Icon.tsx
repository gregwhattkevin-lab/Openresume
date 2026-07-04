import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Languages,
  Heart,
  HandHeart,
  Palette,
  Type,
  Layout,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  FileText,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Flag,
  Car,
  Bold,
  Italic,
  List,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  X,
  Check,
  Settings2,
  PanelsTopLeft,
  Image,
  Zap,
  MessageCircle,
  Link,
  Home,
  PenLine,
  Sparkles,
  Share2,
  Menu,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MoreHorizontal,
  Circle,
  Printer,
  type LucideIcon,
} from 'lucide-react'

function LinkedinIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const iconMap: Record<string, LucideIcon> = {
  user: User,
  briefcase: Briefcase,
  graduationCap: GraduationCap,
  wrench: Wrench,
  languages: Languages,
  heart: Heart,
  handHeart: HandHeart,
  palette: Palette,
  type: Type,
  layout: Layout,
  download: Download,
  upload: Upload,
  rotateCcw: RotateCcw,
  plus: Plus,
  trash2: Trash2,
  gripVertical: GripVertical,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  eye: Eye,
  eyeOff: EyeOff,
  fileText: FileText,
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  linkedin: LinkedinIcon as unknown as LucideIcon,
  globe: Globe,
  calendar: Calendar,
  flag: Flag,
  car: Car,
  bold: Bold,
  italic: Italic,
  list: List,
  maximize2: Maximize2,
  minimize2: Minimize2,
  zoomIn: ZoomIn,
  zoomOut: ZoomOut,
  x: X,
  check: Check,
  settings2: Settings2,
  panelsTopLeft: PanelsTopLeft,
  image: Image,
  zap: Zap,
  messageCircle: MessageCircle,
  link: Link,
  home: Home,
  penLine: PenLine,
  sparkles: Sparkles,
  share2: Share2,
  menu: Menu,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  checkCircle2: CheckCircle2,
  moreHorizontal: MoreHorizontal,
  circle: Circle,
  printer: Printer,
}

interface IconProps {
  name: keyof typeof iconMap
  size?: number
  className?: string
}

export function Icon({ name, size = 18, className = '' }: IconProps) {
  const LucideIconComponent = iconMap[name]
  if (!LucideIconComponent) return null
  return <LucideIconComponent size={size} className={className} />
}
