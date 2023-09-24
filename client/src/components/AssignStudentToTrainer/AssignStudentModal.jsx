import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import SelectStudent from "./SelectStudent";
import Modal from "../Modals/Modal";
import SelectCompanyTrainer from './SelectCompanyTrainer'



const AssignStudentModal = (props) => {
  


  const { closeModal, isOpen,companies } = props;
 
  const [selectedItems, setSelectedItems] = useState([]);
  
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedAreaOfAssignment, setSelectedAreaOfAssignment] = useState(null);



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



       // select student
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


    


 const handleAssign = () => {
//  const assignData= {
//   company: selectedCompany.name,
//   trainer: selectedTrainer.name,
//   area: selectedAreaOfAssignment.name,
//   studentIds: selectedItems.map((student) => student.name),
//  };
//  console.log(assignData);

const selectedStudentCount = selectedItems.length;
const availableSlots = selectedAreaOfAssignment.slots;

if (selectedStudentCount <= availableSlots) {
alert('fd')
} else {
  alert(`Insufficient slots available for ${selectedAreaOfAssignment.name}`);

}
};


// const handleclickk = () => {
//   console.log(':company',selectedCompany.name)
//   console.log('trainer',selectedTrainer.name)
//   console.log('assign area',selectedAreaOfAssignment.name)


// }

  return (
    <>
      {isOpen && (
        <Modal
          title={"Assign Students"}
          closeModal={closeModal}
          content={
            <div>
              <SelectCompanyTrainer 
              sList={selectedItems}
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
              selectedTrainer={selectedTrainer}
              setSelectedTrainer={setSelectedTrainer}
              selectedAreaOfAssignment={selectedAreaOfAssignment}
              setSelectedAreaOfAssignment={setSelectedAreaOfAssignment}
              companies={companies}
              onCLickAssign={handleAssign}
              />
{/* <button className="bg-red-500" onClick={handleAssign}>assign</button> */}
              <SelectStudent
                selectedItems={selectedItems}
                handleRemoveItem={handleRemoveItem}
              />

              <div
                onClick={() => setIsSelectedTrainer(false)}
                className="flex flex-col"
              ></div>
              <div className="w-full p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className=" text-lg font-semibold tracking-wide pl-5">
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
