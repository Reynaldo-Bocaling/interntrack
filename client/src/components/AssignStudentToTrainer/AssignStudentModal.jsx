import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import SelectStudent from "./SelectStudent";
import Modal from "../Modals/Modal";
import SelectCompanyTrainer from "./SelectCompanyTrainer";
import { getTeacher, assignStudent } from "../../api/Api";
import {
  useDisclosure,
} from "@nextui-org/react";

import { useQuery, useMutation , useQueryClient} from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignStudentModal = (props) => {
  const { closeModal, isOpen, companies } = props;
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedAreaOfAssignment, setSelectedAreaOfAssignment] = useState(null);
  const queryClient = useQueryClient();

  const selectStudent =  selectedItems ? selectedItems.map(({id})=> (id)) : []
  const trainer_id = selectedTrainer ? selectedTrainer.id: 0;
  const areaAssigned = selectedAreaOfAssignment ? selectedAreaOfAssignment.id : 0;


  // get student list 
  const {data} = useQuery({
    queryKey: ['getStudent'],
    queryFn: getTeacher
  });

  
  // assign student query function
  const { mutate} = useMutation({
    mutationFn: assignStudent,
    onSuccess: ()=> {
      Swal.fire("Success", "Congratulations! \n The student has been successfully assigned to the OJT program.", "success");
      queryClient.invalidateQueries({queryKey: ['getStudent']})
      setSelectedItems([])
      setSelectedTrainer(null)
      setSelectedAreaOfAssignment(null)
      setSelectedCompany(null)
      closeModal();
      window.location.reload()
    },
    onError: ()=> {
      Swal.fire("Error", "Opps!\n An error occured while asigning the student \n Please try again or contact support for assistance.", "error");
    }
  })

 const studentUnassigned = data 
 ? data.student.filter((item)=> item.trainer === null || item.AreaOfAssignment === null )
 .map(({
  id,
  firstname,
  lastname,
  email,
  gender,
  deletedStatus
 })=> ({
  id,
  name: `${firstname} ${lastname}`,
  email,
  gender,
  deletedStatus
 })).filter((item)=>item.deletedStatus === 0)
 : []


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

  const handleTryCLick = () => {
   
    mutate({
      studentId: selectStudent, 
      trainer_id,
      areaAssigned_id: areaAssigned
    });
    

  };

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
                onCLickAssign={handleTryCLick}
                selectedStudent={selectedItems}
              />
              <SelectStudent
                selectedItems={selectedItems}
                handleRemoveItem={handleRemoveItem}
              />

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
                    {studentUnassigned.length > 0 ?
                    studentUnassigned.map((item) => (
                      <tr key={item.id} className={`cursor-pointer h-12`}>
                        <td className="text-left pl-5 text-sm">{item.id}</td>
                        <td className="capitalize text-left pl-5 text-sm">{item.name}</td>
                        <td className="text-left pl-5 text-sm">{item.email}</td>
                        <td className="capitalize text-left pl-5 text-sm">
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
                    ))
                    : (
                      <tr>
                        <td colSpan={5} className="text-center py-5">No Student</td>
                      </tr>
                    )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default AssignStudentModal;
