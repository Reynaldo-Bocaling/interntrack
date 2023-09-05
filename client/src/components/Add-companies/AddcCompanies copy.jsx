import React, { useState } from "react";
import Modal from "../Modals/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
const AddTrainer = (props) => {
  const { closeModal, isOpen } = props;

  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    contactInfo: "",
    companyDescription: "",
    requirements: "",
    pointOfContact: "",
    availablePositions: [""],
    applicationRequirements: "",
    applicationDeadline: "",
    additionalInstructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePositionChange = (index, value) => {
    const updatedPositions = [...formData.availablePositions];
    updatedPositions[index] = value;
    setFormData({ ...formData, availablePositions: updatedPositions });
  };

  const addPositionInput = () => {
    const updatedPositions = [...formData.availablePositions, ""];
    setFormData({ ...formData, availablePositions: updatedPositions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ito ang bahagi kung paano mo ipapasa ang data sa server o iba pang bahagi ng iyong sistema.
    console.log(formData);
  };

  return (
    <>
      {isOpen && (
        <Modal
          title={"Add New Company"}
          size=""
          closeModal={closeModal}
          content={
            <div className="p-5">
              <form
                onSubmit={handleSubmit}
                className="flex items-start gap-5 px-5"
              >
                <div className="mt-2 border-r pr-12 mr-5">
                  <div>Company Details</div>
                  <div className="mt-5">
                    <TextField
                      className="w-[300px]"
                      id="standard-basic"
                      label="Company Name"
                      variant="standard"
                    />
                  </div>

                  {/* <div className="flex flex-col gap-3 mb-3 mt-7">
                      <label> Company name </label>
                      <input
                        type="text"
                        name="companyName"
                        className="border border-slate-400 h-10 w-[300px] rounded-md pl-3"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                    </div> */}

                  <div className="mt-5">
                    <TextField
                      className="w-[300px]"
                      id="standard-basic"
                      label="Company Address"
                      variant="standard"
                    />
                  </div>

                  <div className="mt-5">
                    <TextField
                      className="w-[300px]"
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                    />
                  </div>

                  <div className="mt-5 mb-8">
                    <TextField
                      className="w-[300px]"
                      id="standard-basic"
                      label="Contact"
                      variant="standard"
                    />
                  </div>

                  <div className="mt-5">
                    <div className="relative bg-green-400 py-3 rounded-md w-[200px] flex items-center justify-center">
                      <input
                        type="file"
                        className="scale-150 absolute opacity-0 cursor-pointer"
                      />
                      <div className="text-white tracking-wide">
                        Upload MOA{" "}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-12 text-sm font-medium tracking-wide text-white bg-blue-500 rounded-md py-3 w-[150px]"
                  >
                    Add company
                  </button>
                </div>



                

                <div className="flex flex-col gap-2">
                  <div className="flex  items-center gap-3">
                    <span>Available Positions:</span>
                    <button
                      type="button"
                      onClick={addPositionInput}
                      className="text-sm font-medium tracking-wide text-white bg-blue-500 rounded-md py-2 w-[100px]"
                    >
                      Add rows
                    </button>
                  </div>

                  {formData.availablePositions.map((position, index) => (
                    <div key={index} className="mt-5 flex items-center gap-5">
                      {/* <input
                            type="text"
                            value={position}
                            onChange={(e) =>
                              handlePositionChange(index, e.target.value)
                            }
                            className="border border-slate-400 h-10 w-[300px] rounded-md pl-3"
                            placeholder={`Position ${index + 1}`}
                          /> */}

                      <TextField
                        className="w-[300px]"
                        id="outlined-number"
                        label={`Position ${index + 1}`}
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        className="w-[100px]"
                        id="outlined-number"
                        label="Slot"
                        type="number"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </form>
            </div>
          }
        />
      )}
    </>
  );
};

export default AddTrainer;
