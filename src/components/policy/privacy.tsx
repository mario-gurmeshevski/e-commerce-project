import { ClipboardIcon } from '@heroicons/react/24/outline'

const Privacy = () => {
	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
				<header className="mb-10 text-center">
					<h1 className="text-3xl font-bold text-black mb-2 flex items-center justify-center">
						Политика за приватност
					</h1>
					<div className="flex items-center justify-center space-x-2 text-gray-900">
						<ClipboardIcon className="w-4 h-4 " />
						<span>Во сила од Октомври 2021</span>
					</div>{' '}
				</header>

				<div className="space-y-10 leading-relaxed">
					<div className="pb-8 border-b border-gray-100">
						<p className="text-lg ">
							Со Политиката на приватност, ќе ви појасниме каде и како се чуваат
							личните податоци на сите потрошувачи на нашата интернет страна.
						</p>
					</div>

					<div className="pb-8 border-b border-gray-100">
						<h2 className="text-xl font-semibold text-black mb-4 flex items-center">
							<span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
							Опсег на политиката
						</h2>
						<p className="">
							Оваа политика на приватност се однесува само за{' '}
							<a
								href="https://makmela.com/"
								className="text-blue-600 hover:text-blue-800 underline font-medium"
								target="_blank"
								rel="noopener noreferrer"
							>
								www.makmela.com
							</a>
							.
						</p>
					</div>

					<div className="pb-8 border-b border-gray-100">
						<h2 className="text-xl font-semibold  mb-4 flex items-center">
							<span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
							Надворешни линкови
						</h2>
						<p className="">
							Доколку е присутен линк кој ќе Ве поврзе со други страни, ние не
							превземаме никаква одговорност во однос на заштитата на личните податоци
							која ја обезбедуваат тие интернет страни.
						</p>
					</div>

					{/* Согласност на корисникот */}
					<div className="pb-8 border-b border-gray-100">
						<h2 className="text-xl font-semibold  mb-4 flex items-center">
							<span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
							Корисничко согласување
						</h2>
						<div className="space-y-4">
							<p>
								Секој купувач при регистрација и купување, изјавува дека е запознаен и
								се согласува со нашата политика на приватност.
							</p>
							<p>
								Со користење на нашата Веб страница, Вие се согласувате со одредбите од
								оваа Политика за приватност на личните податоци на страницата.
							</p>
							<div className="bg-red-50 p-4 rounded-lg border border-red-100">
								<p>
									Доколку не се согласувате со оваа Политика, Ве молиме да не ја
									користите нашата страница.
								</p>
							</div>
						</div>
					</div>

					{/* Собирање податоци */}
					<div className="pb-8 border-b border-gray-100">
						<h2 className="text-xl font-semibold mb-4 flex items-center">
							<span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
							Собранети информации
						</h2>
						<div className="bg-gray-50 p-6 rounded-xl">
							<p>Информациите кои нам ни се потребни се:</p>
							<ul className="list-disc pl-6 mt-3 space-y-2 marker:text-blue-500">
								<li>Име и презиме,</li>
								<li>E-mail адреса,</li>
								<li>Адреса на доставување на нарачката и</li>
								<li>Телефон за контакт.</li>
							</ul>
						</div>
					</div>

					{/* Користење податоци */}
					<div className="pb-8 border-b border-gray-100">
						<h2 className="text-xl font-semibold mb-4 flex items-center">
							<span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
							Ракување со податоци
						</h2>
						<p>
							Сите лични податоци кои корисникот ги внесува преку регистрација се
							користат за успешна достава на производот и реализација на плаќањето, а
							се чуваат согласно одредбите од Законот за заштита на лични податоци и не
							се отстапуваат на трети страни.
						</p>
						<div className="mt-4 p-4 rounded-lg">
							<p>
								Податоците кои ги собираме и се чуваат кај нас, нема да се објавуваат,
								продаваат или доставуваат на трета страна освен на надлежните органи на
								начин определен со законските прописи на Република Северна Македонија.
							</p>
						</div>
					</div>

					{/* Колачиња */}
					<div className="pb-8 border-b border-gray-100">
						<h2 className="text-xl font-semibold  mb-4 flex items-center">
							<span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
							Користење на колачиња
						</h2>
						<div className="space-y-4 bg-yellow-50 p-6 rounded-xl border border-yellow-100">
							<p>
								Нашата Веб страница може да користи колачиња („Cookies“) за да се
								подобри корисничкото искуство.
							</p>
							<p>
								„Cookies“ се мали датотеки кои се внесуваат на компјутерот на
								посетителот од страна на веб страницата.
							</p>
							<p>
								Сите информации кои се меморирани во рамките на „Cookies“ можат да бидат
								искористени само за потребите на веб услугата и тоа на начин на кој
								Вашата приватност нема да биде загрозена.
							</p>
							<p>
								Секој посетител ја има можноста да избере и да го подеси својот
								пребарувач на интернет да ги одбие колачињата или да јави предупредување
								секогаш кога ќе се пратат колачиња.
							</p>
							<p>
								Доколку корисниците ја одберат таа можност, одредени делови од
								страницата може да не функционираат како што е предвидено.
							</p>
						</div>
					</div>

					{/* Правни барања */}
					<div className="pb-8 border-b border-gray-100">
						<h2 className="text-xl font-semibold  mb-4 flex items-center">
							<span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
							Правни барања
						</h2>
						<div className=" p-4 rounded-lg ">
							<p>
								<span className="font-semibold">BeeHappy-Makmela</span> го задржува
								правото да ги користи IP aдресите и другите податоци на корисниците за
								откривање на нивниот идентитет во случај на спроведување на законот и
								законските постапки.
							</p>
						</div>
					</div>

					{/* Промени во политиката */}
					<div className="pb-8">
						<h2 className="text-xl font-semibold  mb-4 flex items-center">
							<span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
							Промени во политиката
						</h2>
						<div className="p-6 rounded-xl">
							<p>
								Оваа политика на приватност стапува на сила од Октомври 2021 година.
							</p>
							<p className="mt-2">
								Промените во политиката на приватност ќе бидат јавно објавени на
								интернет страната{' '}
								<a
									href="https://makmela.com/"
									className="text-blue-600 hover:text-blue-800 underline font-medium"
									target="_blank"
									rel="noopener noreferrer"
								>
									www.makmela.com
								</a>{' '}
								најмалку 10 дена пред да стапат во сила.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Privacy
