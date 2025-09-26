import UsWithTheBees from '../../images/aboutUs/Us_with_the_Bees.jpg'
import AboutTheBrand from '../../images/aboutUs/About_the_Brand.jpg'
import Nature from '../../images/aboutUs/Nature2.jpg'

const AboutUs = () => {
	return (
		<div className="pt-10 pb-16 animate-fade-in">
			<h1 className="text-3xl font-semibold sm:text-4xl underline underline-offset-[12px] sm:underline-offset-[16px] text-center mb-10">
				За нас
			</h1>
			<div className="max-w-7xl mx-auto px-4 mb-20">
				<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row items-stretch gap-8 p-8">
					<div className="md:w-1/2 relative overflow-hidden rounded-xl group">
						<img
							src={AboutTheBrand}
							alt=""
							className="w-full h-full object-cover transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl"
						/>
						<div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
					</div>

					<div className="md:w-1/2 flex flex-col justify-center p-4 space-y-6">
						<h2 className="text-3xl text-black font-bold">НАШЕТО ПЧЕЛАРСТВО</h2>
						<div className="space-y-4 text-gray-700">
							<p className="space-y-4">
								Со повеќе од 15 години искуство, можеме да кажеме дека пчеларството се
								менува.
							</p>

							<div className="border-l-2 border-black pl-4">
								<p>
									Нашата мисија е преку употреба на најнови современи технологии и
									техники во пчеларството, да добиеме високо квалитетни производи
									одговарајќи на потребите на пазарот за здрава органска храна и
									постигнување на континуирана доверба и ефикасност во природното
									пчеларење.
								</p>
							</div>

							<p className="space-y-4">
								Природните состојки се во основата на она што го правиме. Ова овозможува
								да ја одржуваме разновидноста на производите и континуираната еволуција
								на изворите на храна за пчелите.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 mb-20">
				<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row-reverse items-stretch gap-8 p-8">
					<div className="md:w-1/2 relative overflow-hidden rounded-xl group">
						<img
							src={UsWithTheBees}
							alt=""
							className="w-full h-full object-cover transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl"
						/>
						<div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
					</div>

					<div className="md:w-1/2 flex flex-col justify-center p-4 space-y-6">
						<h2 className="text-3xl text-black font-bold">НИЕ И ПЧЕЛИТЕ</h2>

						<div className="space-y-4 text-gray-700">
							<p>
								Во E Commerce сме страствени заљубеници во пчелите и нивните креации.
							</p>

							<div className="grid gap-4 sm:grid-cols-2">
								<div className="border-l-2 border-black pl-4">
									<p>
										Вредно работиме да произведеме суров мед кој е нефилтриран,
										непастеризиран и неподложен на термички третмани!
									</p>
								</div>
								<div className="border-l-2 border-black pl-4">
									<p>
										Нашиот мед ги задржува сите нутритивни својства и придобивки од чист
										еколошки мед произведен од домашни пчели (apis mellifera).
									</p>
								</div>
							</div>

							<div className="pt-3">
								<p>
									Нашата мисија е пчеларство со обработка на високо квалитетни производи
									на пазарот, доверба и постигнување ефикасност преку употреба на најнови
									современи технологии и техники од оваа област.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4">
				<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row items-stretch gap-8 p-8">
					<div className="md:w-1/2 relative overflow-hidden rounded-xl group">
						<img
							src={Nature}
							alt=""
							className="w-full h-full object-cover transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl"
						/>
						<div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
					</div>
					<div className="md:w-1/2 flex flex-col justify-center p-4 space-y-6">
						<h2 className="text-3xl text-black-800 font-bold">ПРИРОДА</h2>

						<div className="space-y-4 text-gray-700">
							<p className="border-l-2 border-black pl-4">
								Мариово е едно од најлегендарните, мистериозните восхитувачки места во
								Македонија.
							</p>

							<div className="space-y-4">
								<p>
									Секој ја знае неговата природна убавина, неговите напуштени села,
									импресивните кањони.
								</p>

								<div className="space-y-4">
									<p>
										Тоа е, на некој начин, дефинирано и од реката Црна што тече низ целата
										област создавајќи кањон долг 100 км.
									</p>
								</div>

								<div className="grid gap-4 sm:grid-cols-2">
									<div className="border-l-2 border-black pl-4">
										<p>
											Мариово е област на 900 метри надморска височина опкружена со високи
											планини, со ритчиња, кратки планини, реки и рамнини.
										</p>
									</div>
									<div className="border-l-2 border-black pl-4">
										<p>
											Планините Дрен и Селешка го штитат Мариово од континенталниот северен
											ветер. На југо-исток сливот на реката Црна овозможува влијанија на
											Медитеранот од Егејско Море.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutUs
