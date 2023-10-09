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

export const AddTrainerAccount = async (data) => {
  try {
    const response = await axios.post(`${url}addTrainer`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const AddCoordinatorAccount = async (data) => {
  try {
    const response = await axios.post(`${url}AddCoordinator`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const addTeacher = async (data) => {
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

export const assignStudent = async({studentId, trainer_id, areaAssigned_id}) => {
  try {
    const response = await axios.put(`${url}assignStudent`, {
      studentId,
      trainer_id,
      areaAssigned_id,
    });
    return response.data;    
  } catch (error) {
    
  }
}





// GET Request
export const getCompanyList = async () => {
  try {
    const response = await axios.get(`${url}getCompanyList`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTrainerList = async () => {
  try {
    const response = await axios.get(`${url}getTrainerList`);
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

export const getCoordinator = async () => {
  try {
    const response = await axios.get(`${url}getCoordinator`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTeacher = async () => {
  try {
    const response = await axios.get(`${url}getTeacher`);
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

export const getStudent = async () => {
  try {
    const response = await axios.get(`${url}getStudent`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCampus = async() => {
  try {
    const response = await axios.get(`${url}getCampus`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getStudentInfo = async(id) => {
  try {
    const response = await axios.get(`${url}getStudentInfo/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}


export const getStudentList = async() => {
  try {
    const response = await axios.get(`${url}getStudentList`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
