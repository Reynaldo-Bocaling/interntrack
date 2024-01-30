import BarLoader from "react-spinners/BarLoader";
import Logo from '../../assets/icons/logo.png'
export const Spinner = () => {
    return (
        <div className="fixed top-0 l-20 h-screen w-full bg-white flex mt-32 justify-center items-start">
                <div className="flex flex-col gap-4 items-center justify-center">
                <BarLoader
  color="#03a8fd"
  width={100}
/>
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