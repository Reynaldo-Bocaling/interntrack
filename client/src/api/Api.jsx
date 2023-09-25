import axios from 'axios';

const url = "http://localhost:3001/";

export const getCompany = async () => {
  try {
    const response = await axios.get(`${url}getCompanyList`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const importStudent = async (data) => {
    try {
      const response = await axios.post(`${url}importStudent`, { excelData: data });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };