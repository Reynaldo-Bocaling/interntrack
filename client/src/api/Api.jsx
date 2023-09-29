import axios from "axios";

const url = "http://localhost:3001/";

// POST Request
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

export const createTeacherAccount = async (data) => {
  try {
    const response = await axios.post(`${url}addTeacher`, data);
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


//GET Request
export const getCompany = async () => {
  try {
    const response = await axios.get(`${url}getCompany`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTrainer = async () => {
  try {
    const response = await axios.get(`${url}getTrainer`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDirector = async () => {
  try {
    const response = await axios.get(`${url}getDirector`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getStudent = async () => {
  try {
    const response = await axios.get(`${url}getStudentList`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getTeacher = async () => {
  try {
    const response = await axios.get(`${url}getTeacherList`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
