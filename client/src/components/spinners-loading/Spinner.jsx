import ClipLoader from "react-spinners/ClipLoader";
import Logo from '../../assets/icons/logo.png'
export const Spinner = () => {
    return (
        <div className="fixed top-0 l-20 h-screen w-full bg-white flex mt-32 justify-center items-start">
                <div className="flex flex-col gap-4 items-center justify-center">
                <ClipLoader color="#037ce6" />
                   <div className="flex items-center gap-3">
                   <img src={Logo} alt="" className="w-[40px]" />
                  <span className="text-gray-400 text-2xl tracking-wider font-medium">
                    InternTrack
                  </span>
                   </div>
                </div>
              </div>
    )
}