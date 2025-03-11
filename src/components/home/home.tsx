import HomeSlideShow from "./homeSlideShow.tsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Dialog, DialogPanel} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/16/solid";

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
            <div className="relative w-full min-h-screen">
                <HomeSlideShow/>
            </div>
            <Dialog
                open={showSuccess}
                onClose={() => setShowSuccess(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 flex items-end justify-end p-4">
                    <DialogPanel className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 transition-all">
                        <CheckIcon className="h-5 w-5"/>
                        <span className="text-sm">{successMessage}</span>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default Home;
