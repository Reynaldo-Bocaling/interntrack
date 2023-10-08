import React from "react";
import CustomAutocomplete from "../SelectCompany/SelectCompany";
import { Button } from "@nextui-org/react";
function SelectCompanyTrainer(props) {
  const {
    selectedCompany,
    setSelectedCompany,
    selectedTrainer,
    setSelectedTrainer,
    selectedAreaOfAssignment,
    setSelectedAreaOfAssignment,
    onCLickAssign,
    companies,
    sList,
  } = props;

  const filteredTrainers = selectedCompany ? selectedCompany.trainer : [];
  const filteredAreasOfAssignment = selectedCompany
    ? selectedCompany.areaOfAssignment
    : [];

  const handleCompanyChange = (event, newValue) => {
    setSelectedCompany(newValue);
    setSelectedAreaOfAssignment(null); // Reset selected area
    setSelectedTrainer(null); // Reset selected trainer
  };

  const handleTrainerChange = (event, newValue) => {
    setSelectedTrainer(newValue);
  };

  const handleAreaChange = (event, newValue) => {
    setSelectedAreaOfAssignment(newValue);
  };

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
          options={filteredAreasOfAssignment}
          label="Choose an Area of Assignment"
          value={selectedAreaOfAssignment}
          onChange={handleAreaChange}
          disabled={!selectedCompany}
          getOptionLabel={(option) => option.areaName}
        />
        {selectedAreaOfAssignment && (
          <p>
            Available Slots for {selectedAreaOfAssignment.areaName}:{" "}
            {selectedAreaOfAssignment.slot}
          </p>
        )}

        <Button
          onClick={onCLickAssign}
          size="lg"
          className="w-[15%] font-medium tracking-wide bg-blue-500 py-3 px-10  text-white rounded-xl"
        >
          Assign
        </Button>
      </div>
    </div>
  );
}

export default SelectCompanyTrainer;
