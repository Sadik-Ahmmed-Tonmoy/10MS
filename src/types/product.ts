/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MediaItem {
  name: string
  resource_type: string
  resource_value: string
  thumbnail_url?: string
}

export interface ChecklistItem {
  text: string
  icon?: string
  color?: string
  id?: string
  list_page_visibility?: boolean
}

export interface SectionValue {
  name?: string
  title?: string
  subtitle?: string
  description?: string
  image?: string
  icon?: string
  text?: string
  short_description?: string
  slug?: string
  has_instructor_page?: boolean
  id?: string
  color?: string
  // Added for feature_explanations type
  checklist?: (string | { text: string })[]
  file_type?: string
  file_url?: string
  video_thumbnail?: string
  // Added for testimonials type
  profile_image?: string
  testimonial?: string
  thumb?: string
  video_type?: string
  video_url?: string
  // Added for faq type
  question?: string
  answer?: string
  // Added for offers type (CountdownTimer)
  end_at?: string
  start_at?: string
  template?: string
  // Added for group_join_engagement type (LeadMagnetCard)
  background?: {
    image?: string
    primary_color?: string
    secondary_color?: string
  }
  cta?: {
    clicked_url?: string
    color?: string
    text?: string
  }
  thumbnail?: string
  title_color?: string
  top_left_icon_img?: string
}

export interface Section {
  type: string
  name?: string
  description?: string
  bg_color?: string
  order_idx?: number
  values?: SectionValue[]
}

export interface SEO {
  title?: string
  description?: string
  keywords?: string[]
}

export interface CTAText {
  name: string
  value: string
}

export interface ProductData {
  slug: string
  id: number
  title: string
  description?: string
  platform: string
  type: string
  modality: string
  start_at: string
  media?: MediaItem[]
  checklist?: ChecklistItem[]
  seo?: SEO
  cta_text: CTAText
  sections?: Section[]
  is_cohort_based_course: boolean
  secondary_cta_group?: any[]
  delivery_method: string
}

export interface ApiResponse {
  code: number
  data: ProductData
  error: any[]
  message: string
  payload: any[]
  status_code: number
}
