import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
function SetupDates() {
  return (
    <div>
      <div className="flex flex-col max-w-[650px] mb-5">
        <span className="text-lg font-semibold mb-2">Date Range Setup</span>
        <small className="text-gray-400 ">
          Please define the start and end dates for student timesheets. Once
          set, the system will automatically generate timesheets for students
          within this date range when you initiate the import and add student
          process.
        </small>
      </div>

      <div className="grid gap-3">
        <Input
          type="date"
          label="Start Date"
          className="max-w-xs"
          name="startDate"
          placeholder=" "
        />
        <Input
          type="date"
          label="End Date"
          className="max-w-xs"
          name="endDate"
          placeholder=" "
        />

        <Button color="primary" size="lg" className="max-w-xs mt-2 font-medium">
          Setup date
        </Button>
      </div>
    </div>
  );
}

export default SetupDates;
