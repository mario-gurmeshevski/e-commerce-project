import Img197 from '../../images/beePollenPropolis/197.jpg'
import Img198 from '../../images/beePollenPropolis/198.jpg'
import Img1086 from '../../images/beePollenPropolis/1086.jpg'
import Img244 from '../../images/beePollenPropolis/244.jpg'
import Img201 from '../../images/beePollenPropolis/201.jpg'
import Img204 from '../../images/beePollenPropolis/204.jpg'

type ImageCardProps = {
	src: string
	alt: string
	className?: string
	aspectRatio?: string
}

const ImageCard = ({
	src,
	alt,
	className = '',
	aspectRatio = 'aspect-square',
}: ImageCardProps) => (
	<div
		className={`relative overflow-hidden rounded-xl group shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
	>
		<img
			src={src}
			alt={alt}
			className={`w-full ${aspectRatio} object-cover transform transition-all duration-500 ease-out group-hover:scale-110`}
			loading="lazy"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
	</div>
)

type SectionProps = {
	children: React.ReactNode
	className?: string
	hasBorder?: boolean
}

const Section = ({
	children,
	className = '',
	hasBorder = false,
}: SectionProps) => (
	<section
		className={`${
			hasBorder ? 'mb-24 border-t border-gray-200 pt-16' : ''
		} ${className}`}
	>
		{children}
	</section>
)

type ContentContainerProps = {
	children: React.ReactNode
	reverse?: boolean
}

const ContentContainer = ({
	children,
	reverse = false,
}: ContentContainerProps) => (
	<div
		className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 ${
			reverse ? 'lg:grid-flow-col-dense' : ''
		}`}
	>
		{children}
	</div>
)

const BeePollenPropolis = () => {
	return (
		<div className="max-w-7xl mx-auto py-10 px-6 lg:px-12 bg-white">
			<div className="text-center mb-10">
				<h1 className="text-3xl font-semibold sm:text-4xl underline underline-offset-[12px] sm:underline-offset-[16px] text-center mb-10">
					Полен и Прополис
				</h1>
			</div>

			<Section>
				<ContentContainer>
					<div className="lg:order-2">
						<ImageCard
							src={Img197}
							alt="Полено збирач"
							aspectRatio="aspect-[4/3]"
							className="max-w-lg mx-auto"
						/>
					</div>
					<div className="lg:order-1 space-y-6">
						<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
							Собирање на полен
						</h2>
						<p className="text-lg text-gray-700 leading-relaxed">
							Додека повеќето пчели во потрага по храна се посветени на собирање нектар
							за производство на мед, околу{' '}
							<strong className="text-gray-900">15 до 30 проценти</strong> од нив
							собираат полен во летовите надвор од кошницата.
						</p>
						<p className="text-lg text-gray-700 leading-relaxed">
							Поленот се користи за производство на "пчелин леб", главниот извор на
							протеини во исхраната на пчелите. За да не се расипе поленот, пчелите
							додаваат ензими и киселини кон него од секретите на плунковните жлезди.
						</p>
					</div>
				</ContentContainer>
			</Section>

			<Section hasBorder>
				<ContentContainer>
					<div className="space-y-6">
						<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
							Собирање на полен од кошница
						</h2>
						<p className="text-lg text-gray-700 leading-relaxed">
							Собирањето на полен мора да се одвива во фаза на расцветување на цвеќето.
							За да го направи ова, пчеларот става полено збирачи на предниот дел од
							кошниците.
						</p>
						<p className="text-lg text-gray-700 leading-relaxed">
							Принципот е едноставен: пчелата што се враќа во кошницата мора да помине
							низ решетка, наречена „полен-чешел", која ги задржува топчињата обесени
							на задните нозе. Топките паѓаат, низ сито, во фиока недостапна за
							пчелите.
						</p>
						<p className="text-lg text-gray-700 leading-relaxed">
							Пчеларот, приближно на секои два дена оди за да го собере поленот од
							полено збирачите.
						</p>
					</div>
					<div className="grid grid-cols-2 gap-6">
						<ImageCard src={Img198} alt="Полено збирач" />
						<ImageCard src={Img1086} alt="Пчелар собира полен" />
					</div>
				</ContentContainer>
			</Section>

			<Section hasBorder>
				<ContentContainer>
					<div className="grid grid-rows-2 gap-6">
						<ImageCard src={Img244} alt="Прополис" />
						<ImageCard src={Img201} alt="Пчелар и прополис" />
					</div>
					<div className="space-y-8">
						<div>
							<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
								Прополис
							</h2>
							<p className="text-lg text-gray-700 leading-relaxed mb-6">
								Пчелите се единствените инсекти за кои е утврдено дека немаат бактерии,
								поради дејството на прополисот. Прополисот е смолеста материја што
								пчелите ја собираат од дрво и други ботанички извори.
							</p>
							<p className="text-lg text-gray-700 leading-relaxed">
								Во случај на собирање на нектар, пчелите кои се соларни инсекти го
								собираат есенцијалниот сок од дрвјата и цвеќињата, а потоа додаваат свои
								ензими за да направат прополис. Меѓу другото, пчелите го користат за да
								ја одржат хигиенaта во кошницата.
							</p>
						</div>

						<div>
							<h3 className="text-2xl font-bold text-gray-900 mb-4">
								Како пчелите прават прополис
							</h3>
							<div className="space-y-4">
								<p className="text-lg text-gray-700 leading-relaxed">
									Работничките пчели ја собираат смолестата материја во корпите за полен
									на нозете и ја носат назад во кошницата. Во секоја од корпите за полен
									може да носи околу{' '}
									<strong className="text-gray-900">10 мг прополис</strong>.
								</p>
								<p className="text-lg text-gray-700 leading-relaxed">
									Затоа што смолата е многу леплива, работничките пчели не можат сами да
									ја растоварат туку треба да имаат уште една пчела да ја растовари
									својата дарба за нив.
								</p>
							</div>
						</div>

						<div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
							<h4 className="text-xl font-bold text-gray-900 mb-4">
								Состав на прополис:
							</h4>
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div className="flex">
									<span className="pr-1">Смоли:</span>
									<strong className="text-gray-900">50%</strong>
								</div>
								<div className="flex">
									<span className="pr-1">Восоци:</span>
									<strong className="text-gray-900">30%</strong>
								</div>
								<div className="flex">
									<span className="pr-1">Есенцијални масла:</span>
									<strong className="text-gray-900">10%</strong>
								</div>
								<div className="flex">
									<span className="pr-1">Полен:</span>
									<strong className="text-gray-900">5%</strong>
								</div>
								<div className="flex col-span-2">
									<span className="pr-1">Растителни остатоци:</span>
									<strong className="text-gray-900">5%</strong>
								</div>
							</div>
						</div>
					</div>
				</ContentContainer>
			</Section>

			<Section>
				<ImageCard
					src={Img204}
					alt="Пчелин прополис"
					aspectRatio="aspect-video"
					className="max-w-4xl mx-auto"
				/>
			</Section>
		</div>
	)
}

export default BeePollenPropolis
