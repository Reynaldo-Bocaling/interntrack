import React, { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { TbMaximize, TbMinimize } from "react-icons/tb";
import { BiSearch } from "react-icons/bi";
import icon from "../../assets/icons/logo.png";
import SelectStudent from "./SelectStudent";
import SelectTrainer from "./SelectTrainer";

function AssignStudentModal(props) {
  const { closeModal, isOpen } = props;
  const [isSelectedTrainer, setIsSelectedTrainer] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [fullScreen, setFullscreen] = useState(false);

  const tableData = [
    { id: 1, name: "Angela Delos Santos" , email: 'Angela@gmail.com', gender: 'female' },
    { id: 2, name: "Sunshine Perez" , email: 'Sunshine@gmail.com', gender: 'female' },
    { id: 3, name: "Helen Hyband" , email: 'Helen@gmail.com', gender: 'female' },
    { id: 4, name: "Mia Alcantara" , email: 'Mia@gmail.com', gender: 'female' },
    { id: 5, name: "Justine Paul Mariano" , email: 'Justine@gmail.com', gender: 'female' },
    { id: 6, name: "Xian Santos" , email: 'Xian@gmail.com', gender: 'female' },
    { id: 7, name: "Alfredo Suman" , email: 'Alfredo@gmail.com', gender: 'female' },
    { id: 8, name: "Renalyn Peralta" , email: 'Reynalun@gmail.com', gender: 'female' },
    { id: 9, name: "Symon Inggal" , email: 'Symon@gmail.com', gender: 'female' },
    { id: 10, name: "Renz Alana" , email: 'Renz@gmail.com', gender: 'female' },
   
  ];

  const trainerList = [
    {id: 1, name: "Roan Cochanco", totalStudent: '20 Students'},
    {id: 2, name: "Gel Cunanan", totalStudent: '18 Students'},
    {id: 3, name: "Drew Villegas", totalStudent: '23 Students'},
    {id: 4, name: "Crist Unknown", totalStudent: '16 Students'},
    {id: 5, name: "Gloria Alcantara", totalStudent: '14 Students'},
  ]

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
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(70,74,80,0.15)] z-50 ">
          <div
            className={`relative ${
              fullScreen ? "max-w-screen h-screen" : "max-w-[900px] h-[570px]"
            } w-full modal   bg-white rounded-xl shadow-xl transition-all `}
          >

            <header className="absolute top-0 left-0 bg-white h-[50px] w-full flex items-center justify-between rounded-t-lg z-30 p-2 px-5 border-b border-slate-100">
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

            <main 
            className=" max-h-full w-full overflow-y-auto pt-[60px]
            ">
              <div>
                
                <SelectTrainer 
                  selectItem={selectedItems}  
                  data={trainerList}
                  toggle={()=> setIsSelectedTrainer(!isSelectedTrainer)}
                  isOpen={isSelectedTrainer}
                  removeSlected={()=> setSelectedItems([])}
                />

                <SelectStudent
                  selectedItems={selectedItems}
                  handleRemoveItem={handleRemoveItem}
                  toggleTrainer={()=> setIsSelectedTrainer(false)}
                />

              <div 
              onClick={()=> setIsSelectedTrainer(false)}
              className="flex flex-col"
              >
              </div>
                <div className="w-full p-5">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold tracking-wide pl-5">Student List</h2>
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
                        <th className="text-left pl-5 font-semibold tracking-wide text-sm">ID</th>
                        <th className="text-left pl-5 font-semibold tracking-wide text-sm">Name</th>
                        <th className="text-left pl-5 font-semibold tracking-wide text-sm">Email</th>
                        <th className="text-left pl-5 font-semibold tracking-wide text-sm">Gender</th>
                        <th className="text-left pl-5 font-semibold tracking-wide text-sm">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item) => (
                        <tr key={item.id} className={`cursor-pointer h-12`}>
                          <td  className="text-left pl-5 text-sm">{item.id}</td>
                          <td  className="text-left pl-5 text-sm">{item.name}</td>
                          <td  className="text-left pl-5 text-sm">{item.email}</td>
                          <td  className="text-left pl-5 text-sm">{item.gender}</td>
                          <td  className="text-left pl-5 text-sm">
                            <button
                              className={`py-1 px-3 rounded ${
                                isItemSelected(item)
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "bg-blue-500 text-white"
                              }`}
                              onClick={() => {
                                handleItemClick(item);
                              }
                              }
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
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default AssignStudentModal;
