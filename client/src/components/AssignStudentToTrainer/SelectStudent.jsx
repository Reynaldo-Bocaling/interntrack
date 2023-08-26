import React from "react";
import { LiaTimesSolid } from "react-icons/lia";

function SelectStudent(props) {
  const { selectedItems, handleRemoveItem, toggleTrainer } = props;

  return (
    <div 
    onClick={toggleTrainer}
    className="w-full border p-2">
      <div className="p-4">
        <h3 className="text-lg font-medium tracking-wide">
          Selected Students:
        </h3>
        <ul className="flex flex-wrap gap-3 mt-5">
          {selectedItems.length !== 0 ? (
            selectedItems.map((item) => (
              <li
                className="bg-gray-100 px-5 py-2 rounded-full flex items-center justify-between gap-4"
                key={item.id}
              >
                <span>{item.name}</span>
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveItem(item)}
                >
                  <LiaTimesSolid />
                </button>
              </li>
            ))
          ) : (
            <div className="text-gray-500">No Selected</div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SelectStudent;
