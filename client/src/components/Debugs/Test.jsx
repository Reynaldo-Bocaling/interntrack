import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import {useMutation} from '@tanstack/react-query';


function App() {
  const [excelFile, setExcelFile] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);


  // sanitation
  const validateData = (data) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const row of data) {
      if (!nameRegex.test(row.firstname) || !emailRegex.test(row.email)) {
        return false;
      }
    }

    return true;
  };


  const { mutate, isLoading } = useMutation({
    mutationFn: data => {
      return axios.post('http://localhost:3001/importStudent', { excelData: data });
    },
    onSuccess: ()=> {
      alert('Success')
    },
    onError: ()=> {
      alert("failed")
    }
  })


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setExcelFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet);

        const isValid = validateData(excelData);

        if(!isValid) {
          setError("Invalid data in the excel file.")
        }else{
          setError(null);
          setData(excelData);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleImportExcel = () => {
    mutate(data)

  
    
  };

  if(isLoading) {
    return <h1>Processing..</h1>
  }

  return (
    <div>
      <h1>Import Excel File</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleImportExcel} disbaled={error}>Import</button>

      {error && <p className="error">{error}</p>}

     <div className='bg-red-500 p-5 mt-10'>
        {
            data ? data.length: '0'
        }
        <div className='nt-5 bg-blue-500'>
            {
                data? 
                
               data.map((item, index)=> (
                    <h1 key={index}>{item.firstname}</h1>
               ))
                
                : <h1>No data</h1>
            }
        </div>
     </div>
    </div>
  );
}

export default App;
