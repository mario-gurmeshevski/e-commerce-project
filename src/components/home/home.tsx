import HomeSlideShow from "./homeSlideShow.tsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const Home = () => {
    const location = useLocation();
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (location.state?.showCancelSuccess) {
            setShowSuccess(true);
            setSuccessMessage(location.state.message);

            const timer = setTimeout(() => {
                setShowSuccess(false);
                setSuccessMessage('');

            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [location.state]);


    return (
        <>
            <div className="relative">
                <HomeSlideShow />
{/*                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <HomeLinks />
                </div>*/}
            </div>
            {showSuccess && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg flex items-center text-sm sm:text-base z-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {successMessage}
                </div>
            )}
        </>
    );
};

export default Home;
