import { ClipboardIcon } from '@heroicons/react/24/outline';

const Terms = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <header className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 bg-clip-text">
                        Услови за користење
                    </h2>
                    <div className="flex items-center justify-center space-x-2 text-gray-500">
                        <ClipboardIcon className="w-4 h-4 text-gray-500" />
                        <span>Во сила од октомври 2021</span>
                    </div>
                </header>

                <div className="space-y-12">
                    {/* Рок на испорака */}
                    <div className="py-8 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Рок на испорака
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>Рокот на испорака е до 5 работни дена од моментот на потврда на плаќањето.</p>
                            <div className="p-4 rounded-lg border">
                                <p><span className="font-semibold">BeeHappy-Makmela</span> го задржува правото да го продолжи рокот на испорака во претходен договор со купувачот.</p>
                            </div>
                            <p>Испораката се врши само на територијата на Република Северна Македонија.</p>
                        </div>
                    </div>

                    {/* Преземање на нарачката */}
                    <div className="py-8 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Преземање на нарачката
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p>Пред испораката на производот, купувачот ќе биде телефонски контактиран, на телефонскиот број оставен за контакт, за потврдување на датумот и времето на испораката.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p>Цените важат за градовите низ цела Република Северна Македонија.</p>
                                    <p className="mt-2">Испораката се врши преку нашата служба за испорака или преку надворешни соработници.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Цена на испорака */}
                    <div className="py-8 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Цена на испорака
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <ul className="space-y-2">
                                <li>Доставата за Скопје е бесплатна.</li>
                                <li>Цената за достава во останатите градови над 2000 денари е бесплатна.</li>
                                <li>Цената за достава во останатите градови под 2000 денари изнесува 150 денари.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Прием на производите */}
                    <div className="py-8 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Прием на производите
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>Секој купувач е должен при превземање на производот, да го провери од евентуални оштетувања при транспорт, а доколку се работи за повеќе производи, да провери дали некој производ недостасува.</p>
                            <p>Доколку производот е испорачан оштетен, или одреден производ недостасува од нарачката, купувачот треба да не информира веднаш, како би превземале мерки за отстранување на ненамерната грешка.</p>
                            <p>Во овој случај, трошоците за замена на производот ќе бидат на наш товар.</p>
                        </div>
                    </div>

                    {/* Враќање и замена */}
                    <div className="py-8 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Враќање и замена
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>Доколку купувачот сака да го замени производот, должен е да го чува неоштетен, неотпакуван и неупотребуван заедно со сите приложени документи. Доколку има доцнење од страна на компанијата која ја врши доставата, BeeHappy-Makmela не може да превземе никаква одговорност.</p>
                            <p>Во случај купувачот да сака да го врати производот, не по наша вина или вина на доставувачот, и сака да му се врати уплатената сума, тогаш од крајниот износ ќе биде одбиен трошокот за транспорт.</p>
                        </div>
                    </div>

                    {/* Останати информации */}
                    <div className="py-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Останати информации за испорака
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <ul className="list-disc pl-[1.5rem] space-y-[0.5rem]">
                                <li>Испорака во сабота по 16 часот, во недела и државни празници не се врши.</li>
                                <li>Нарачки направени по 17 часот ќе бидат проверени наредниот работен ден.</li>
                                <li>Викендите и неработните денови не се пресметуваат во рокот за испорака.</li>
                                <li>Испораката се врши до адресата наведена од купувачот.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Terms;
