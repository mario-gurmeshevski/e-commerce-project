export interface ContentItem {
	type: 'paragraph' | 'image'
	content: string
	itemHeader?: string
}

export interface HealthSection {
	contentHeader?: string
	items: ContentItem[]
}

export interface Health {
	id: string
	title: string
	header?: string
	mainImage: string
	slug: string
	content: HealthSection[]
	createdAt: string
	deletedAt?: string
}
