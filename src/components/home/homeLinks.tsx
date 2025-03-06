import shopImage from "../../images/image5.jpg";
import aboutUsImage from "../../images/image6.jpg";

const HomeLinks = () => {
    const items = [
        {
            title: "Visit Our Shop",
            image: shopImage,
            url: "/shop"
        },
        {
            title: "About Us",
            image: aboutUsImage,
            url: "/about"
        },
    ];

    return (
        <div className="z-10 w-full px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-center items-center flex-wrap gap-4 sm:gap-6 md:gap-8">
                    {items.map((item, index) => (
                        <a
                            href={item.url}
                            key={index}
                            className="relative h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 transition-all duration-500 hover:scale-105 hover:z-10 group"
                            style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 via-transparent opacity-0"
                                style={{ backgroundImage: `url(${item.image})` }}
                            >
                                <div className="absolute inset-0 bg-gray-700/30 group-hover:bg-gray-800/40 transition-all" />
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-center p-2 sm:p-4 transform -rotate-12 group-hover:rotate-0 transition-transform bg-gray-800/40 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg">
                                    {item.title}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeLinks;
