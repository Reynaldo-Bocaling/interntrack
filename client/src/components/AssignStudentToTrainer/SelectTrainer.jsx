import React, { useState } from 'react'
import { AiOutlineUsergroupAdd } from "react-icons/ai";

function SelectTrainer(props) {
    const {selectItem} = props;
    
  return (
    <div>
      <div className='w-full p-3 pr-7 flex items-center gap-5'>
        <select className='h-14 w-full border rounded'>
            <option value="">-Select Teacher</option>
            <option value="">-Alex Cochanco</option>
        </select>
        <button 
        disabled={selectItem.length ===0}
        onClick={()=> alert("success")}
        className={`${selectItem.length ===0? 'bg-slate-300':'bg-blue-500'} flex items-center gap-1 text-xs text-white  px-4 py-2 rounded-full`}>
              <AiOutlineUsergroupAdd size={17} />
              <span className='font-semibold tracking-wider'>Assign</span>
          </button>
      </div>
    </div>
  )
}

export default SelectTrainer
