import React from "react";
import { User } from "@nextui-org/react";
import { Drawer } from "@mantine/core";
import pic from "../../assets/images/dp.png";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { RiArrowRightSLine } from "react-icons/ri";
import { LiaTimesSolid } from "react-icons/lia";
import { RiArrowDropDownFill } from "react-icons/ri";
import { BsDot } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { BiSearch, BiHelpCircle } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { getTimesheet } from "../../api/Api";
import { format, parse } from "date-fns";
import { AiOutlineCheck } from "react-icons/ai";

<BiHelpCircle size={20} />;

function Drawer2({ opened, close }) {
  const formattedDate = format(new Date(), "yyyy-MM-dd");

  const { data } = useQuery({
    queryKey: ["getStudentDailyLog"],
    queryFn: getTimesheet,
  });

  const getTime = data ? data.find((item) => item.date === formattedDate) : [];
  const timeInDB = getTime?.timeIn;
  const timeOutDB = getTime?.timeOut;
  const totalHoursDB = getTime?.totalHours;
  const timeId = getTime?.id;

  return (
    <div>
      <Drawer
        position="right"
        size="85%"
        opened={opened}
        onClose={close}
        title={
          <header className="mt-2">
            <span className="text-xl font-semibold">Menu</span>
          </header>
        }
      >
        <div className="my-4 px-1">
          <User
            name={
              <p className="text-[1.1rem] font-medium tracking-wide mb-2">
                Reynaldo Bocaling
              </p>
            }
            description="Student"
            avatarProps={{
              src: pic,
              size: "lg",
            }}
          />

          <div className="my-5">
            <div className="flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg hover:text-blue-500">
              <div className="flex items-center gap-2">
                <div className="text-blue-500 p-1 bg-blue-100 rounded-full">
                  <BiHelpCircle size={20} />
                </div>
                <span className="text-sm">Help</span>
              </div>
              <RiArrowRightSLine />
            </div>

            <div className="flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg hover:text-blue-500">
              <div className="flex items-center gap-2">
                <div className="text-blue-500 p-1 bg-blue-100 rounded-full">
                  <FiSettings size={20} />
                </div>
                <span className="text-sm">Settings</span>
              </div>
              <RiArrowRightSLine />
            </div>

            <div className="flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg mt-3 hover:text-red-500 hover:bg-red-50">
              <div className="flex items-center gap-2">
                <div className="text-red-500 p-1 bg-red-100 rounded-full">
                  <LiaSignOutAltSolid size={20} />
                </div>
                <span className="text-sm textgray-500">Sign out</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            {totalHoursDB > 0 ? (
              <div className="my-10 text-2xl flex items-center justify-center gap-1 text-green-500">
                End Work <AiOutlineCheck />
              </div>
            ) : timeInDB !== "0:00" ? (
              <div className="flex flex-col items-center justify-center gap-3 my-10">
                <small className="text-gray-500 tracking-wide">
                  Time-in for today
                  <h1></h1>
                </small>
                <h1 className="text-3xl font-bold">{timeInDB}</h1>
              </div>
            ) : (
              <div className="w-full text-2xl text-gray-500 my-10 flex items-center justify-center gap-1">
                Time in not yet <LiaTimesSolid className="text-red-500" />
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Drawer2;
