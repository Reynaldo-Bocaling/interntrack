import React from "react";
import { Input } from "@nextui-org/react";

const Information = ({ data }) => {

  return (
    <div>
      <p className="text-lg font-semibold mb-4">Personal Information</p>
      <div className="grid gap-4">
        {data &&
          data.map((item, index) => (
            <Input
              key={index}
              isDisabled
              value={item.value || ''}
              type="text"
              label={item.label || ''}
              className="max-w-lg"
            />
          ))}
      </div>
    </div>
  );
}

export default Information;
