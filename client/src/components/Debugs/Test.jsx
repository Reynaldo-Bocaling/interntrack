import React, { useState } from 'react';
import axios from 'axios';

const Import = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('excelFile', file);

      await axios.post('http://localhost:3001/addManyStudent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('File uploaded successfully!');
    } catch (error) {
     console.log(error);
    }
  };

   
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload Excel File
      </button>
    </div>
  );
};

export default Import;
