export interface Donor {
  id: string
  name: string
  email: string
  amount: number
  type: string
  date: string
  status: string
}

export interface Campaign {
  id: string
  title: string
  target: number
  raised: number
  status: string
  description: string
}

export interface GalleryItem {
  id: string
  title: string
  imageurl: string
  tag: string
  date: string
  description: string
}

export interface BlogPost {
  id: string
  title: string
  type: 'text' | 'image' | 'video'
  content: string
  mediaurl: string
  thumbnailurl: string
  date: string
  author: string
}

export interface NotificationState {
  text: string
  type: string
}

export type DonorFormData = Omit<Donor, 'id' | 'date'>
export type CampaignFormData = Omit<Campaign, 'id'>
export type GalleryFormData = Omit<GalleryItem, 'id' | 'date'>
export type BlogFormData = Omit<BlogPost, 'id' | 'date'>

export type ModalType = 'donor' | 'campaign' | 'gallery' | 'blog' | ''
export type ModalMode = 'add' | 'edit'
