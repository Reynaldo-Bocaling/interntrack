import React from "react";
import { Student } from "../../components/dummyData/Data";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Drawer,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "../../assets/images/neustLogo.png";
const WeeklyReport = () => {
  const student = Student;
  const [opened, { open, close }] = useDisclosure(false);
  const calculateTotalHours = (timeSheet) => {
    return timeSheet.reduce((sum, entry) => sum + entry.totalHours, 0);
  };

  const groupedTimeSheet = [];
  for (let i = 0; i < student.timeSheet.length; i += 5) {
    groupedTimeSheet.push(student.timeSheet.slice(i, i + 5));
  }

  const Studentlabel = "<NAME OF STUDENT>";
  const Trainerlabel = "<NAME OF TRAINER>";

  return (
    <div>
      <Card className="flex flex-col gap-5 ">
      <h2 className="text-xl font-semibold mb-3">Weekly Reports</h2>
        {groupedTimeSheet.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="p-3 rounded-lg border bg-gray-100 hover:bg-slate-50 hover:border-blue-400 cursor-pointer"
            onClick={open}
          >
            <Card.Section
              component="a"
              href="https://mantine.dev/"
            ></Card.Section>
            <Group position="apart" width={"100%"} mt="md" mb="xs">
              <Text weight={500}>
                {group[0].date} - {group[group.length - 1].date}
              </Text>
              <Badge color="green" variant="light">
                Ok
              </Badge>
            </Group>
          </div>
        ))}
      </Card>

      <Drawer
        position="bottom"
        size="100%"
        opened={opened}
        onClose={close}
        title={
          <header className="mt-2">
            <span className="text-xl font-semibold">Weekly report</span>
          </header>
        }
      >
        <div className="weekly-report-container mx-auto px-4 sm:px-10">
          <div className="m-4 border-b-2 border-black flex items-center justify-between pb-2">
            <img src={logo} alt="" className="w-20 sm:w-28" />
            <div className="mt-4 flex flex-col items-end text-[10px] sm:text-[12px]">
              <span className="text-[8px] sm:text-[9.5px] font-light">
                Republic of the Philippines
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-light">
                NUEVA ECIJA UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-light">
                On–the–Job Training and Career Development Center
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-light">
                Cabanatuan City
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-light">
                ISO 9001:2015 Certified
              </span>
            </div>
          </div>

          <main className="text-[10px] sm:text-[12px]">
            <h5 className="text-center text-[10px] sm:text-[12px] max-w-[330px] mx-auto mt-3">
              STUDENT ON–THE–JOB–TRAINING WEEKLY REPORT
            </h5>

            <div className="grid grid-cols-2 gap-2 sm:gap-4 items-center justify-between border-[2px] border-[#000] rounded-[4px] mt-3">
              <div className="pl-2 py-2 ">Name:</div>
              <div className="border-l-[2px] border-[#000] pl-2 py-2">
                Company:
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center justify-between border-[2px] border-[#000] rounded-[4px] mt-3">
              <div className="h-[60px] sm:h-[80px] overflow-hidden pl-2 py-2">
                Course and Section:
              </div>
              <div className="h-[60px] sm:h-[80px] overflow-hidden border-l-[2px]  border-[#000] pl-2 py-2">
                Training Station:
              </div>
              <div className="h-[60px] sm:h-[80px] overflow-hidden border-l-[2px]  border-[#000] pl-2 py-2">
                Date:
              </div>
            </div>

            <div className="overflow-x-auto mt-3">
              <table className="w-full border-[2px] border-[#000]">
                <thead>
                  <tr>
                    <th className="w-[20%] sm:w-[15%] text-center border-[2px] font-medium border-[#000] px-2 sm:px-5 ">
                      DAYS
                    </th>
                    <th className="w-[60%] sm:w-[70%] text-center border-[2px] font-medium border-[#000] px-2 sm:px-5 ">
                      SUMMARY OF WORK, DUTIES AND RESPONSIBILITIES
                    </th>
                    <th className="w-[20%] sm:w-[15%] text-center border-[2px] font-medium border-[#000] px-2 sm:px-5 ">
                      HOURS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-[70px]">
                    <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
                      Monday
                    </td>
                    <td className="border-[2px] border-[#000] px-2 sm:px-5">
                      Sample work description
                    </td>
                    <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
                      8
                    </td>
                  </tr>
                  <tr className="h-[80px]">
                    <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
                      Tuesday
                    </td>
                    <td className="border-[2px] border-[#000] px-2 sm:px-5">
                      Sample work description
                    </td>
                    <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
                      8
                    </td>
                  </tr>
                  <tr className="h-[80px]">
                    <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
                      Wednesday
                    </td>
                    <td className="border-[2px] border-[#000] px-2 sm:px-5">
                      Sample work description
                    </td>
                    <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
                      8
                    </td>
                  </tr>
                  <tr className="h-[80px]">
                    <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
                      Thursday
                    </td>
                    <td className="border-[2px] border-[#000] px-2 sm:px-5">
                      Sample work description
                    </td>
                    <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
                      8
                    </td>
                  </tr>
                  <tr className="h-[80px]">
                    <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
                      Friday
                    </td>
                    <td className="border-[2px] border-[#000] px-2 sm:px-5">
                      Sample work description
                    </td>
                    <td className="text-center border-[2px] border-[#000] px-2 sm:px-5">
                      8
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between">
              <div className="flex flex-col gap-4">
                <div>
                  <p>Prepared by:</p>
                  <span className="text-[12px] font-medium">Studentlabel</span>
                  <p>On-the-Job Trainee</p>
                </div>
                <div>
                  <p>Noted by:</p>
                  <span className="text-[12px] font-medium">
                    AlEXANDER S. COCHANCO
                  </span>
                  <p>Ojt Coordinator</p>

                  <div className="flex flex-col">
                    <span>NEUST-OJT-F011 REv.</span>
                    <span>00 (02.11.19)</span>
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <p>Checked by:</p>
                  <span className="text-[12px] font-medium">Trainerlabel</span>
                  <p>Trainer/Supervisor</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Drawer>
    </div>
  );
};

export default WeeklyReport;
