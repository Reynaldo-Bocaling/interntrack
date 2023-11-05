import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import excel1 from "../../assets/icons/excelImg1.png";
import excel2 from "../../assets/icons/excelImg4.png";
import excel3 from "../../assets/icons/excelImg5.png";
import excel4 from "../../assets/icons/excelImg6.png";
import logo from "../../assets/icons/logo.png";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import { PiWarningOctagonBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import WarningIcon from '../../assets/images/warning.png';

const ImportStudentModalUI = (props) => {
  const {
    isOpen,
    onClose,
    error,
    ImportData,
    importLoading,
    handleFileChange,
    handleImportExcel,
    DateRangeData
  } = props;


  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="top-center"
      className="h-[370px] max-w-[500px]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex  gap-1">
              <img src={logo} alt="" className="w-[28px]" />
              <span className="text-sm">Import Student</span>
            </ModalHeader>

            <ModalBody>
              {
                !DateRangeData?.start_date || !DateRangeData?.end_date? 
                (
                  <div className="h-full w-full flex flex-col justify-start items-center gap-5">
                    <img src={WarningIcon} className="h-16 w-16" />
                    <p className="text-gray-400 tracking-wider font-light text-sm">
                    Before you can import or add students, please set up the date range. Click <Link to="/Settings" className="text-blue-500 underline mx-2">'Go to Settings'</Link> and then 'Set Date Range' to specify the date range for generating student timesheets.
                  </p>
                  </div>
                ):(
                  <div className="relative h-full flex flex-col items-center justify-center gap-5 overflow-hidden">
                <button
                  className={`circleImport relative h-[90px] w-[90px] text-blue-500 rounded-full mb-4  border flex items-center justify-center`}
                >
                  {ImportData ? (
                    <FiCheck size={30} className="check text-green-500" />
                  ) : (
                    <AiOutlineCloudDownload size={30} />
                  )}
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute scale-[3] opacity-0 cursor-pointer "
                    accept=".xlsx, xls"
                  />
                </button>
                <span
                  className={`${
                    ImportData ? "text-green-500" : "text-red-500"
                  } font-medium tracking-wide`}
                >
                  {ImportData ? (
                    <div className="flex flex-col items-center gap-3">
                      Success! All data is valid{" "}
                      <small className="font-normal text-gray-500">
                        Total of Student : {ImportData.length}
                      </small>
                    </div>
                  ) : error == null ? (
                    <small className="clicktoUploadTextBlink text-gray-400">
                      Click to upload
                    </small>
                  ) : (
                    error
                  )}
                </span>
                <button
                  disabled={!ImportData}
                  onClick={handleImportExcel}
                  className={` ${
                    !ImportData
                      ? "cursor-not-allowed bg-blue-300"
                      : "bg-blue-500"
                  } text-white font-medium tracking-wide  shadow-2xl shadow-blue-50 py-2 px-10 rounded-full overflow-hidden`}
                >
                  <span>{importLoading ? "Processing..." : "Import Now"}</span>
                </button>
                {!ImportData && (
                  <small className=" -mt-3 text-red-300">Not Available</small>
                )}

                <img
                  src={excel1}
                  alt=""
                  className="imageImport rotate absolute top-2 left-1 w-[80px] opacity-[0.05]"
                />
                <img
                  src={excel2}
                  alt=""
                  className="imageImport absolute top-0 -right-4 w-[100px] opacity-[0.08]"
                />
                <img
                  src={excel3}
                  alt=""
                  className="imageImport  absolute bottom-[10%] right-5 w-[50px] opacity-[0.08]"
                />
                <img
                  src={excel4}
                  alt=""
                  className="imageImport  absolute bottom-[40%] left-12 w-[50px] opacity-[0.08]"
                />
              </div>
                )
              }
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ImportStudentModalUI;
