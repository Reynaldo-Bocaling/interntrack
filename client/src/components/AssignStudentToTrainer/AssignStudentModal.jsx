import React, { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { TbMaximize, TbMinimize } from "react-icons/tb";
import icon from "../../assets/icons/logo.png";
import SelectStudent from "./SelectStudent";
import SelectTrainer from "./SelectTrainer";

function AssignStudentModal(props) {
  const { closeModal, isOpen } = props;

  const [selectedItems, setSelectedItems] = useState([]);
  const [fullScreen, setFullscreen] = useState(false);

  const tableData = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
    { id: 6, name: "Item 6" },
    { id: 7, name: "Item 7" },
    { id: 8, name: "Item 8" },
    { id: 0, name: "Item 9" },
    { id: 10, name: "Item 10" },
    { id: 11, name: "Item 11" },
    { id: 12, name: "Item 12" },
    { id: 13, name: "Item 13" },
    { id: 14, name: "Item 14" },
    { id: 15, name: "Item 15" },
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
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(70,74,80,0.15)] z-50">
          <div
            className={`relative ${
              fullScreen ? "max-w-screen h-screen" : "max-w-[900px] h-[550px]"
            } w-full modal   bg-white rounded-xl shadow-xl transition-all `}
          >
            <header className="absolute top-0 left-0 bg-white h-[50px] w-full flex items-center justify-between p-2 px-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img src={icon} alt="error" className="max-w-[30px]" />
                <span className="font-medium">Assign Student to Trainer</span>
              </div>

              <div className="flex items-center gap-3">
                <div onClick={() => setFullscreen(!fullScreen)}>
                  {!fullScreen ? (
                    <TbMaximize
                      size={20}
                      className="text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <TbMinimize
                      size={22}
                      className=" text-gray-400 cursor-pointer"
                    />
                  )}
                </div>

                <LiaTimesSolid
                  size={21}
                  className="text-gray-400 cursor-pointer"
                  onClick={() => {
                    closeModal();
                    setFullscreen(false);
                  }}
                />
              </div>
            </header>

            <main className=" max-h-full w-full overflow-y-auto pt-[60px]">
              <SelectTrainer selectItem={selectedItems} />
              <SelectStudent
                selectedItems={selectedItems}
                handleRemoveItem={handleRemoveItem}
              />

              <div className="flex flex-col">
                <div className="w-full p-5">
                  <table className="table-auto">
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item) => (
                        <tr key={item.id} className={`cursor-pointer h-12`}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>
                            <button
                              className={`py-1 px-3 rounded ${
                                isItemSelected(item)
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "bg-blue-500 text-white"
                              }`}
                              onClick={() => handleItemClick(item)}
                              disabled={isItemSelected(item)}
                            >
                              {isItemSelected(item) ? "Selected" : "Select"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </table>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default AssignStudentModal;
