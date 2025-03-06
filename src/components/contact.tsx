const Contact = () => {
    return (
        <div className="pt-10 pb-10 px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center mb-10">
                <p className="text-3xl sm:text-4xl underline underline-offset-[12px] sm:underline-offset-[16px]">
                    Контактирај нѐ
                </p>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 mb-10">
                {/* First Column */}
                <div className="space-y-2">
                    <hr className="w-8 border-t-2 border-black" />
                    <p className="text-2xl sm:text-3xl">Макмела</p>
                    <p className="text-2xl sm:text-3xl pt-2 sm:pt-4">Апикултура</p>
                </div>

                {/* Second Column */}
                <div className="space-y-2">
                    <hr className="w-8 border-t-2 border-black" />
                    <p className="text-2xl sm:text-3xl">Фарма</p>
                    <p className="text-base">R1107, Старо Лагово,</p>
                    <p className="text-base">Прилеп, </p>
                    <p className="text-base">Северна Македонија, 7500 </p>
                </div>

                {/* Third Column */}
                <div className="space-y-2">
                    <hr className="w-8 border-t-2 border-black" />
                    <p className="text-2xl sm:text-3xl">Адреса</p>
                    <a href="mailto:info@makmela.com" className="text-base block hover:underline">
                        info@makmela.com
                    </a>
                    <a href="tel:+38970400344" className="text-base block hover:underline">
                        T: +389 70 400 344
                    </a>
                </div>

                {/* Fourth Column */}
                <div className="space-y-2">
                    <hr className="w-8 border-t-2 border-black" />
                    <p className="text-2xl sm:text-3xl">Следете нѐ</p>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                       className="text-base block hover:underline">
                        Facebook
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                       className="text-base block hover:underline">
                        Instagram
                    </a>
                </div>
            </div>

            <div className="mt-10">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1927.7893134048873!2d21.437205467558712!3d41.98637520547707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354156e09f8f943%3A0x4f70677f66ebc77c!2sQinshift%20Academy!5e0!3m2!1sen!2smk!4v1740407987859!5m2!1sen!2smk"
                    width="100%"
                    height="350"
                    className="h-[350px] sm:h-[400px] lg:h-[450px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Makmela Location Map"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;
