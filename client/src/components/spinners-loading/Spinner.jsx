import PulseLoader from "react-spinners/PulseLoader";

export const Spinner = () => {
    return (
        <div className="fixed top-0 l-20 h-screen w-full bg-white flex mt-32 justify-center">
                <div className="flex flex-col gap-4">
                  <PulseLoader
                    color="red"
                    margin={8}
                    size={15}
                    speedMultiplier={1}
                  />

                  <span className="text-gray-400 text-2xl tracking-wider font-medium">
                    Loading..
                  </span>
                </div>
              </div>
    )
}