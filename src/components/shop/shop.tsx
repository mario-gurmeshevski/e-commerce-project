import { useEffect, useState } from 'react'
import axios from 'axios'
import { CategoryEnum, Honey } from '../../interfaces/honey'
import ShopItem from './shopItem'
import Loader from '../common/Loader.tsx'
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Tab,
	TabGroup,
	TabList,
} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'

const CATEGORY_LABELS: Record<CategoryEnum | 'all', string> = {
	all: 'Сите',
	[CategoryEnum.HONEY]: 'Мед',
	[CategoryEnum.POLLEN]: 'Полен',
	[CategoryEnum.HONEYCOMB]: 'Саќе',
	[CategoryEnum.ROYAL_JELLY]: 'Матичен Млеч',
	[CategoryEnum.PROPOLIS_SPRAY]: 'Прополис Спреј',
}

const SORT_OPTIONS = [
	{ value: 'name_asc', label: 'Име (A-Ш)' },
	{ value: 'name_desc', label: 'Име (Ш-А)' },
	{ value: 'price_asc', label: 'Цена (најниска)' },
	{ value: 'price_desc', label: 'Цена (највисока)' },
]

const Shop = () => {
	const [items, setItems] = useState<Honey[]>([])
	const [loading, setLoading] = useState(true)
	const [category, setCategory] = useState<'all' | CategoryEnum>('all')
	const [sort, setSort] = useState('name_asc')

	useEffect(() => {
		setLoading(true)
		const controller = new AbortController()
		const fetchProducts = async () => {
			try {
				const params: Record<string, string> = {}
				if (category !== 'all') params.category = category
				if (sort === 'price_asc') {
					params.sortBy = 'price'
					params.order = 'asc'
				} else if (sort === 'price_desc') {
					params.sortBy = 'price'
					params.order = 'desc'
				} else if (sort === 'name_asc') {
					params.sortBy = 'name'
					params.order = 'asc'
				} else if (sort === 'name_desc') {
					params.sortBy = 'name'
					params.order = 'desc'
				}
				const { data } = await axios.get<Honey[]>('/api/honey', {
					params,
					signal: controller.signal,
				})
				setItems(data)
			} catch (error) {
				if (!axios.isCancel(error)) {
					//console.error('Error fetching products:', error)
				}
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false)
				}
			}
		}
		fetchProducts()
		return () => controller.abort()
	}, [category, sort])

	return (
		<main className="container mx-auto px-4 py-8 md:pb-12 md:pt-10">
			<h1 className="text-3xl font-semibold sm:text-4xl underline underline-offset-[12px] sm:underline-offset-[16px] text-center mb-10">
				Продавница
			</h1>
			<div className="flex flex-col gap-4 mb-8 lg:flex-row lg:items-center lg:justify-between">
				<TabGroup
					selectedIndex={Object.keys(CATEGORY_LABELS).indexOf(category)}
					onChange={(idx) => setCategory(Object.keys(CATEGORY_LABELS)[idx] as any)}
					className="w-full lg:w-auto"
				>
					<TabList className="flex gap-2 w-full overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
						{Object.entries(CATEGORY_LABELS).map(([key, label]) => (
							<Tab
								key={key}
								className={({ selected }) =>
									`px-4 py-2 rounded-lg w-full text-left font-medium transition focus:outline-none focus:ring-1 focus:ring-black whitespace-nowrap ${
										selected
											? 'bg-gray-200 text-black'
											: 'bg-gray-50 text-black hover:bg-gray-100'
									}`
								}
							>
								{label}
							</Tab>
						))}
					</TabList>
				</TabGroup>

				<div className="flex justify-center lg:justify-end lg:w-auto">
					<Listbox value={sort} onChange={setSort}>
						<div className="relative w-full max-w-xs sm:w-52 sm:mx-0 lg:shrink-0">
							<ListboxButton className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black w-full text-left truncate">
								{SORT_OPTIONS.find((opt) => opt.value === sort)?.label}
								<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
									<ChevronUpDownIcon
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</span>
							</ListboxButton>
							<ListboxOptions className="absolute mt-1 w-full max-h-60 overflow-auto bg-white shadow-lg rounded-lg z-10 focus:outline-none py-1 text-base ring-1 ring-black ring-opacity-5">
								{SORT_OPTIONS.map((opt) => (
									<ListboxOption
										key={opt.value}
										value={opt.value}
										className={({ active }) =>
											`cursor-pointer select-none relative py-2 pl-10 pr-4 ${
												active ? 'bg-gray-100 text-black' : 'text-gray-900'
											}`
										}
									>
										{({ selected }) => (
											<>
												<span
													className={`block truncate ${
														selected ? 'font-semibold' : 'font-normal'
													}`}
												>
													{opt.label}
												</span>
												{selected ? (
													<CheckIcon className="absolute h-8 w-8 inset-y-0 left-0 flex self-center pl-3" />
												) : null}
											</>
										)}
									</ListboxOption>
								))}
							</ListboxOptions>
						</div>
					</Listbox>
				</div>
			</div>

			{loading ? (
				<Loader />
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
					{items.length === 0 ? (
						<div className="col-span-full text-center text-gray-500 py-10">
							Нема производи во оваа категорија.
						</div>
					) : (
						items.map((item) => <ShopItem key={item.id} item={item} />)
					)}
				</div>
			)}
		</main>
	)
}

export default Shop
