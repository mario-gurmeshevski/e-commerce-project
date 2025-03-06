import {ClipboardIcon} from "@heroicons/react/24/outline";

const Privacy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                        Privacy Policy
                    </h1>
                    <div className="flex items-center justify-center space-x-2 text-gray-500">
                        <ClipboardIcon className="w-4 h-4 text-gray-500" />
                        <span>Effective Since October 2021</span>
                    </div>                </header>

                <div className="space-y-10 text-gray-700 leading-relaxed">
                    {/* Introduction */}
                    <div className="pb-8 border-b border-gray-100">
                        <p className="text-lg text-gray-800">
                            With the Privacy Policy, we will explain where and how the personal data of all consumers is stored on our website.
                        </p>
                    </div>

                    {/* Scope */}
                    <div className="pb-8 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Policy Scope
                        </h2>
                        <p>This privacy policy applies only to <a href="https://makmela.com/" className="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer">www.makmela.com</a>.</p>
                    </div>

                    {/* Third-Party Links */}
                    <div className="pb-8 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            External Links
                        </h2>
                        <p>If there is a link that links you to other sites, we do not take any responsibility for the personal data protection provided by those websites.</p>
                    </div>

                    {/* User Consent */}
                    <div className="pb-8 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            User Agreement
                        </h2>
                        <div className="space-y-4">
                            <p>By registering and buying, every consumer confirms that he is familiar and agrees to our policy of privacy.</p>
                            <p>By using our Website, you agree to the terms of this Privacy Policy on the Site.</p>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                <p>If you do not agree with this Policy, please do not use our site.</p>
                            </div>
                        </div>
                    </div>

                    {/* Data Collection */}
                    <div className="pb-8 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Collected Information
                        </h2>
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <p>The information that is kept by us is:</p>
                            <ul className="list-disc pl-6 mt-3 space-y-2 marker:text-blue-500">
                                <li>Name and Surname,</li>
                                <li>E-Mail Address,</li>
                                <li>Address for the delivery and a</li>
                                <li>Contact telephone number.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Data Usage */}
                    <div className="pb-8 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Data Handling
                        </h2>
                        <p>Every personal information that the consumers leave by registering are used for a more precise delivery of the product and realization of the payment, and are kept according to the Act on the Protection of Personal Information and are not to be given to a third party.</p>
                        <div className="mt-4 p-4 rounded-lg">
                            <p>The data we collect are stored with us, will not be published, sold or submitted to a third party except to the competent authorities in a manner determined by the legal regulations of the Republic of North Macedonia.</p>
                        </div>
                    </div>

                    {/* Cookies */}
                    <div className="pb-8 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Cookie Usage
                        </h2>
                        <div className="space-y-4 bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                            <p>Our Website may use cookies to improve the user experience.</p>
                            <p>"Cookies" are small files that are entered on the visitor's computer by the web server.</p>
                            <p>All information stored within the "Cookies" can be used only for the needs of the web service in a way that your privacy will not be compromised.</p>
                            <p>Every visitor has the opportunity to choose and set their browser to reject cookies or to issue a warning whenever cookies are sent.</p>
                            <p>If users select this option, certain parts of the site may not function as intended.</p>
                        </div>
                    </div>

                    {/* Legal Compliance */}
                    <div className="pb-8 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Legal Requirements
                        </h2>
                        <div className=" p-4 rounded-lg ">
                            <p><span className="font-semibold">BeeHappy-Makmela</span> reserves the right to use the IP addresses and other data of the users to reveal their identity in case of law enforcement and legal procedures.</p>
                        </div>
                    </div>

                    {/* Policy Updates */}
                    <div className="pb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Policy Changes
                        </h2>
                        <div className="p-6 rounded-xl">
                            <p>This policy of privacy comes into force on October 2021.</p>
                            <p className="mt-2">If there are changes in the policy, they will be publicly announced on the web site <a href="https://makmela.com/" className="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer">www.makmela.com</a> at least 10 days before they come into force.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
