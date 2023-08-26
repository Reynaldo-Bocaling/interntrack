import React from "react";

function InputText(props) {
    const {label, value, type} = props;
  return (
     <div className="flex flex-col gap-1 w-full">
      <small 
      className="text-slate-700 font-medium tracking-wide"
      >
        {label}
      </small>
      <input
        type={type}
        value={value}
        className="h-10 w-full text-gray-600 pl-3 bg-white border border-slate-200 rounded-lg "
        disabled
        
      />
    </div>
  );
}

export default InputText;
