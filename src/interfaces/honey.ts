export interface Honey {
	id: string
	name: string
	price: number
	stock: number
	category: string
	weight: number
	discount: number
	flowers: string
	flowers_description: string
	aroma: string
	aroma_explanation: string
	aroma_description: string
	consume: string
	consume_date: string
	image: string
}

export enum CategoryEnum {
	HONEY = 'honey',
	HONEYCOMB = 'honeycomb',
	POLLEN = 'pollen',
	ROYAL_JELLY = 'royal_jelly',
	PROPOLIS_SPRAY = 'propolis_spray',
}
