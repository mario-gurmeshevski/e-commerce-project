import HomeSlideShow from "./homeSlideShow.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (location.state?.showCancelSuccess && !hasShownToast.current) {
      toast.success(location.state.message || "Success!", {
        duration: 3000,
        position: "top-center",
      });
      hasShownToast.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      <Toaster position="top-center" />
      <div className="relative w-full min-h-screen">
        <HomeSlideShow />
      </div>
    </>
  );
};

export default Home;
