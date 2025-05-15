export interface ContentItem {
	type: 'paragraph' | 'image'
	content: string | string[]
	itemHeader?: string
}

export interface BlogSection {
	contentHeader?: string
	items: ContentItem[]
}

export interface Blog {
	id: string
	title: string
	header?: string
	mainImage: string
	slug: string
	content: BlogSection[]
	createdAt: string
	deletedAt?: string
}
