import React, { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { TbMaximize, TbMinimize } from "react-icons/tb";
import icon from "../../assets/icons/logo.png";

const ModalSetup = (props) => {
  const { title, closeModal, content } = props;

  const [fullScreen, setFullscreen] = useState(false);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-[rgba(70,74,80,0.15)] z-50 ">
        <div
          className={`relative ${
            fullScreen ? "max-w-screen h-screen" : "max-w-[900px] h-[570px]"
          } w-full modal   bg-white rounded-xl shadow-xl transition-all `}
        >
          <header className="absolute top-0 left-0 bg-gray-100 h-[50px] w-full flex items-center justify-between rounded-t-lg z-30 p-2 px-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <img src={icon} alt="error" className="max-w-[30px]" />
              <span className="font-medium">{title}</span>
            </div>

            <div className="flex items-center gap-3">
              <div onClick={() => setFullscreen(!fullScreen)}>
                {!fullScreen ? (
                  <TbMaximize
                    size={20}
                    className="text-gray-400 cursor-pointer"
                  />
                ) : (
                  <TbMinimize
                    size={22}
                    className=" text-gray-400 cursor-pointer"
                  />
                )}
              </div>

              <LiaTimesSolid
                size={21}
                className="text-gray-400 cursor-pointer"
                onClick={() => {
                  closeModal();
                  setFullscreen(false);
                }}
              />
            </div>
          </header>

          <main className=" max-h-full w-full overflow-y-auto pt-[50px]" >
            {content}
          </main>
        </div>
      </div>
    </>
  );
};

export default ModalSetup;
