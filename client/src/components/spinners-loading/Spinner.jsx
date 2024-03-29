import BarLoader from "react-spinners/BarLoader";
import DotLoader from "react-spinners/DotLoader";

import Logo from "../../assets/icons/logo.png";

export const BarLoading = () => {
  return (
    <div className="fixed top-0 l-20 h-screen w-full bg-white flex mt-32 justify-center items-start">
      <div className="flex flex-col gap-4 items-center justify-center">
        <BarLoader color="#40A2E3" width={100} />
        <div className="flex items-center gap-3">
          <img src={Logo} alt="" className="w-[40px]" />
          <span className="text-gray-400 text-2xl tracking-wider font-medium">
            InternTrack
          </span>
        </div>
      </div>
    </div>
  );
};

export const DotLoading = () => {
  return (
    <div className=" w-full flex items-start justify-center py-5">
      <DotLoader
        color="#40A2E3"
        cssOverride={{}}
        size={40}
        speedMultiplier={1}
      />
    </div>
  );
};
