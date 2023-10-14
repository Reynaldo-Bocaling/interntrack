import axios from "axios";

const url = "http://localhost:3001/";

// POST Request

// login
export const auth = async (data) => {
  try {
    const response = await axios.post(`${url}auth`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// import
export const importStudent = async (data) => {
  try {
    const response = await axios.post(`${url}importStudent`, {
      excelData: data,
    }, { withCredentials: true });
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


export const AddDirectorAccount = async (data) => {
  try {
    const response = await axios.post(`${url}addDirector`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const AddCoordinatorAccount = async (data) => {
  try {
    const response = await axios.post(`${url}AddCoordinator`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const addTeacher = async (data) => {
  try {
    const response = await axios.post(`${url}addTeacher`, data, { withCredentials: true });
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


// assign student
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

//attendance request
export const attendanceRequest = async (id)=>{
  try {
    const response = await axios.put(`${url}attendanceRequest`, {id});
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

export const getTeacherList = async () => {
  try {
    const response = await axios.get(`${url}getTeacherList`);
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

export const getDirectorList = async () => {
  try {
    const response = await axios.get(`${url}getDirectorList`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getCoordinatorList = async () => {
  try {
    const response = await axios.get(`${url}getCoordinatorList`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};



// info
export const getDirector = async () => {
  try {
    const response = await axios.get(`${url}getDirector`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCoordinator = async () => {
  try {
    const response = await axios.get(`${url}getCoordinator`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTeacher = async () => {
  try {
    const response = await axios.get(`${url}getTeacher`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTrainer = async () => {
  try {
    const response = await axios.get(`${url}getTrainer`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getStudent = async () => {
  try {
    const response = await axios.get(`${url}getStudent`,{ withCredentials: true } );
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


export const verifyToken = async () => {
  try {
    const response = await axios.get(`${url}verify`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};



// logout
export const logout = async () => {
  try {
    const response = await axios.post(`${url}logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

