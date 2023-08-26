import React, { useState } from 'react'
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { PiCaretUpDown } from "react-icons/pi";
import { LiaTimesSolid } from "react-icons/lia";
import pic from '../../assets/images/dp.png'
function SelectTrainer(props) {
    const {selectItem, data, isOpen, toggle, removeSlected } = props;
    
    const [value, setValue] = useState(null);

    const handleSelectTrainer = (item) => {
      setValue(item)
    }

    const handleAssign = () => {
      alert("sucess")
       removeSlected()
        setValue(null)
    }
  return (
    <div>
      <div 
      className="w-full p-3 pr-7 flex items-center gap-5"> 
        <div
          onClick={toggle}
          className='relative w-full border rounded-lg shadow-lg shadow-slate-200'
        >
          <div 
          className={`${isOpen? 'rounded-t-lg':'rounded-lg'} flex items-center justify-between cursor-pointer px-3 py-3 bg-white border-b border-slate-200`}
          >
            <span>{value === null? '-Select Trainer': value.name}</span>
            <div className="flex items-center gap-4">
             {value !== null &&  <LiaTimesSolid className='text-red-500' onClick={()=> setValue(null)} />}
              <PiCaretUpDown />
            </div>
          </div>
          {isOpen && (
            <div
              className='absolute top-[100%] left-0 w-full bg-white p-3 shadow-lg rounded-b-lg'
            >
              <ul className="flex  flex-col justify-center gap-3 ">
                {data.map((item) => (
                  <li
                    className="flex items-center justify-between hover:bg-slate-50 cursor-pointer"
                    key={item.id}
                    onClick={()=> handleSelectTrainer(item)}
                  >
                    <div className='flex items-center gap-3'>
                      <img
                        src={pic}
                        alt="error"
                        className="w-[40px] border p-1 rounded-full"
                      />
                      <h5>{item.name}</h5>
                    </div>
                    <div className='text-gray-500 text-sm pr-3'>
                      {item.totalStudent}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          disabled={selectItem.length === 0 || value === null}
          onClick={handleAssign}
          className={`${
            selectItem.length === 0 || value === null ? "bg-slate-300 cursor-not-allowed" : "bg-blue-500"
          } flex items-center gap-1 text-xs text-white  px-4 py-2 rounded-full`}
        >
          <AiOutlineUsergroupAdd size={17} />
          <span className="font-semibold tracking-wider">Assign</span>
        </button>
      </div>
    </div>
  );
}

export default SelectTrainer
