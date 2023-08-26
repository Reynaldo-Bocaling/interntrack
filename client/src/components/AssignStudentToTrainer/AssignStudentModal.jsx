import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import SelectStudent from "./SelectStudent";
import SelectTrainer from "./SelectTrainer";
import Modal from "../Modals/Modal";


const AssignStudentModal = (props) => {
  const { closeModal, isOpen } = props;
 
  const [selectedItems, setSelectedItems] = useState([]);
  

  const tableData = [
    {
      id: 1,
      name: "Angela Delos Santos",
      email: "Angela@gmail.com",
      gender: "female",
    },
    {
      id: 2,
      name: "Sunshine Perez",
      email: "Sunshine@gmail.com",
      gender: "female",
    },
    { id: 3, name: "Helen Hyband", email: "Helen@gmail.com", gender: "female" },
    { id: 4, name: "Mia Alcantara", email: "Mia@gmail.com", gender: "female" },
    {
      id: 5,
      name: "Justine Paul Mariano",
      email: "Justine@gmail.com",
      gender: "female",
    },
    { id: 6, name: "Xian Santos", email: "Xian@gmail.com", gender: "female" },
    {
      id: 7,
      name: "Alfredo Suman",
      email: "Alfredo@gmail.com",
      gender: "female",
    },
    {
      id: 8,
      name: "Renalyn Peralta",
      email: "Reynalun@gmail.com",
      gender: "female",
    },
    { id: 9, name: "Symon Inggal", email: "Symon@gmail.com", gender: "female" },
    { id: 10, name: "Renz Alana", email: "Renz@gmail.com", gender: "female" },
  ];

  const trainerList = [
    { id: 1, name: "Roan Cochanco", totalStudent: "20 Students" },
    { id: 2, name: "Gel Cunanan", totalStudent: "18 Students" },
    { id: 3, name: "Drew Villegas", totalStudent: "23 Students" },
    { id: 4, name: "Crist Unknown", totalStudent: "16 Students" },
    { id: 5, name: "Gloria Alcantara", totalStudent: "14 Students" },
  ];

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleRemoveItem = (item) => {
    const updatedSelectedItems = selectedItems.filter(
      (selectedItem) => selectedItem.id !== item.id
    );
    setSelectedItems(updatedSelectedItems);
  };

  const isItemSelected = (item) =>
    selectedItems.some((selectedItem) => selectedItem.id === item.id);

  return (
    <>
      {isOpen && (
        <Modal
          title={"Add Students"}
          closeModal={closeModal}
          content={
            <div>
              <SelectTrainer
                options={trainerList}
                removeSlected={() => setSelectedItems([])}
                selectItem={selectedItems}
              />

              <SelectStudent
                selectedItems={selectedItems}
                handleRemoveItem={handleRemoveItem}
                toggleTrainer={() => setIsSelectedTrainer(false)}
              />

              <div
                onClick={() => setIsSelectedTrainer(false)}
                className="flex flex-col"
              ></div>
              <div className="w-full p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold tracking-wide pl-5">
                    Student List
                  </h2>
                  <div className="h-10 w-[230px] flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-100 border">
                    <BiSearch />
                    <input
                      type="text"
                      placeholder="Search.."
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="outline-none text-sm"
                    />
                  </div>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="h-12 border-b border-slate-200">
                      <th className="text-left pl-5 font-semibold tracking-wide text-sm">
                        ID
                      </th>
                      <th className="text-left pl-5 font-semibold tracking-wide text-sm">
                        Name
                      </th>
                      <th className="text-left pl-5 font-semibold tracking-wide text-sm">
                        Email
                      </th>
                      <th className="text-left pl-5 font-semibold tracking-wide text-sm">
                        Gender
                      </th>
                      <th className="text-left pl-5 font-semibold tracking-wide text-sm">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item) => (
                      <tr key={item.id} className={`cursor-pointer h-12`}>
                        <td className="text-left pl-5 text-sm">{item.id}</td>
                        <td className="text-left pl-5 text-sm">{item.name}</td>
                        <td className="text-left pl-5 text-sm">{item.email}</td>
                        <td className="text-left pl-5 text-sm">
                          {item.gender}
                        </td>
                        <td className="text-left pl-5 text-sm">
                          <button
                            className={`py-1 px-3 rounded ${
                              isItemSelected(item)
                                ? "text-gray-400 cursor-not-allowed"
                                : "bg-blue-500 text-white"
                            }`}
                            onClick={() => {
                              handleItemClick(item);
                            }}
                            disabled={isItemSelected(item)}
                          >
                            {isItemSelected(item) ? "Selected" : "Select"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          }
        />
      )}
    </>
  );
}

export default AssignStudentModal;
