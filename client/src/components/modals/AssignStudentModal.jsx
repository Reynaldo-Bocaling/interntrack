import React, { useState } from "react";
import { LiaTimesCircleSolid } from "react-icons/lia";
import icon from "../../assets/icons/logo.png";

function AssignStudentModal(props) {
  const { closeModal, isOpen } = props;

  const [selectedItems, setSelectedItems] = useState([]);

  const tableData = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  const handleItemClick = (item) => {
      setSelectedItems([...selectedItems, item]);
    
  };

  const isItemSelected = (item) => selectedItems.some((selectedItem) => selectedItem.id === item.id);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(70,74,80,0.15)] z-50">
          <div className="modal max-w-[900px] w-full h-[550px] bg-white rounded-xl shadow-xl transition-all">
            <header className="absolute top-0 left-0 bg-white h-[50px] w-full flex items-center justify-between p-2 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img src={icon} alt="error" className="max-w-[30px]" />
                <span className="font-medium">Assign Student to Trainer</span>
              </div>
              <LiaTimesCircleSolid
                size={27}
                className="text-red-500 cursor-pointer"
                onClick={closeModal}
              />
            </header>

            <main className="bg-red-500 max-h-full w-full overflow-y-auto pt-[60px]">
              <div className="flex">
                <div className="w-1/2 border p-4">
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item) => (
                        <tr
                          key={item.id}
                          className={`cursor-pointer ${
                            isItemSelected(item) ? "bg-gray-300" : ""
                          }`}
                        >
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>
                            <button
                              className={`py-1 px-3 ${
                                isItemSelected(item)
                                  ? "bg-blue-300 cursor-not-allowed"
                                  : "bg-blue-500 text-white"
                              }`}
                              onClick={() => handleItemClick(item)}
                              disabled={isItemSelected(item)}
                            >
                              {isItemSelected(item) ? "Added" : "Add"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="w-1/2 border p-4">
                  <div className="p-4">
                    <h3>Selected Items:</h3>
                    <ul>
                      {selectedItems.map((item) => (
                        <li key={item.id}>{item.name}</li>
                      ))}
                    </ul>
                  </div>
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
