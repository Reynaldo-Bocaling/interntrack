import axios from "axios";

const url = "http://localhost:3001/";

export const importStudent = async (data) => {
  try {
    const response = await axios.post(`${url}importStudent`, {
      excelData: data,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createTrainerAccount = async (data) => {
  try {
    const response = await axios.post(`${url}addTrainer`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addCompany = async (formData) => {
  try {
    const response = await axios.post(`${url}addCompany`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCompany = async () => {
  try {
    const response = await axios.get(`${url}getCompanyList`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTrainer = async () => {
  try {
    const response = await axios.get(`${url}getTrainerList`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
