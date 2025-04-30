export const formatProductSlug = (name: string) => {
	return name
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^а-бв-гд-ѓе-жз-ѕи-јк-лљм-нњо-пр-ст-ќу-фх-цч-џш0-9-]/g, '')
		.replace(/-+/g, '-')
}
