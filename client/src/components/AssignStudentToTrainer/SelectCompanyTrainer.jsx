import React from "react";
import CustomAutocomplete from "../SelectCompany/SelectCompany";
import { Button } from "@nextui-org/react";


const SelectCompanyTrainer = (props) => {
  const {
    selectedCompany,
    setSelectedCompany,
    selectedTrainer,
    setSelectedTrainer,
    selectedAreaOfAssignment,
    setSelectedAreaOfAssignment,
    onCLickAssign,
    companies,
    isLoading,
    selectedStudent,
  } = props;

  const filteredAreasOfAssignment = selectedCompany
    ? selectedCompany.areaOfAssignment
    : [];

  const areaOption = selectedCompany
    ? selectedCompany?.areaOfAssignment
        .map(({ id, areaName, company_id, trainer, slot, student }) => ({
          id,
          key: id,
          areaName,
          company_id,
          trainer,
          slot,
          student,
          studenttotal: student ? student.length : 0,
        }))
        .filter((item) => item.slot > item.studenttotal)
    : [];

  const filteredTrainers = selectedAreaOfAssignment
    ? selectedAreaOfAssignment.trainer
    : [];

  const handleCompanyChange = (event, newValue) => {
    setSelectedCompany(newValue);
    setSelectedAreaOfAssignment(null); // Reset selected area
    setSelectedTrainer(null); // Reset selected trainer
  };

  const handleAreaChange = (event, newValue) => {
    setSelectedAreaOfAssignment(newValue);
  };

  const handleTrainerChange = (event, newValue) => {
    setSelectedTrainer(newValue);
  };

  const areaTotalStudent = selectedAreaOfAssignment?.student.length;
  const areaSlot = selectedAreaOfAssignment?.slot
    ? selectedAreaOfAssignment?.slot
    : "notSelectArea";
  const totalAvailable = areaSlot - areaTotalStudent;

  return (
    <div className="p-5 flex flex-col gap-3">
      <div className="flex gap-3">
        <CustomAutocomplete
          size={"w-[50%]"}
          options={companies}
          label="Choose a Company"
          value={selectedCompany}
          onChange={handleCompanyChange}
          getOptionLabel={(option) => option.companyName}
        />

        <CustomAutocomplete
          size={"w-[50%]"}
          options={filteredTrainers}
          label="Choose a Trainer"
          value={selectedTrainer}
          onChange={handleTrainerChange}
          disabled={!selectedCompany}
          getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
        />
      </div>

      <div className="flex items-center gap-5">
        <CustomAutocomplete
          size={"w-[85%]"}
          options={areaOption}
          label="Choose an Area of Assignment"
          value={selectedAreaOfAssignment}
          onChange={handleAreaChange}
          disabled={!selectedCompany}
          getOptionLabel={(option) => option.areaName}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />

        {selectedAreaOfAssignment && (
          <p>
            Available Slots for {selectedAreaOfAssignment.areaName}:{" "}
            {totalAvailable}
          </p>
        )}

        <Button
          onClick={onCLickAssign}
          size="lg"
          className={`${
            selectedStudent === null ||
            selectedTrainer === null ||
            selectedAreaOfAssignment === null ||
            selectedStudent.length > totalAvailable
              ? "cursor-not-allowed bg-blue-300"
              : "bg-blue-500"
          } w-[15%] font-medium tracking-wide  py-3 px-10  text-white rounded-xl`}
          disabled={
            selectedStudent == [] ||
            selectedTrainer === null ||
            selectedAreaOfAssignment === null ||
            selectedStudent.length > totalAvailable ||
            isLoading
          }
        >
          {
            isLoading ? 'Assigning..':'Assign'
          }
        </Button>
      </div>
    </div>
  );
}

export default SelectCompanyTrainer;
