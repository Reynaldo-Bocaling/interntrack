import axios from "axios";

// const url = "http://localhost:3001/";
const url = "https://server.interntrack.link/";

// POST Request

// login
export const auth = async (data) => {
  try {
    const response = await axios.post(`${url}auth`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// import
export const importStudent = async (data) => {
  try {
    const response = await axios.post(
      `${url}importStudent`,
      {
        excelData: data,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addAdminAccount = async (data) => {
  try {
    const response = await axios.post(`${url}addSuperAdmin`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addStudentAccount = async (data) => {
  try {
    const response = await axios.post(`${url}addStudent`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const AddTrainerAccount = async (data) => {
  try {
    const response = await axios.post(`${url}addTrainer`, data, {
      withCredentials: true,
    });
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
    const response = await axios.post(`${url}AddCoordinator`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const PromoteAsCoordinator = async (data) => {
  try {
    const response = await axios.post(`${url}PromoteAsCoordinator`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addTeacher = async (data) => {
  try {
    const response = await axios.post(`${url}addTeacher`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addCompany = async (formData) => {
  try {
    const response = await axios.post(`${url}addCompany`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// add campus
export const addCampus = async (campus_Location) => {
  try {
    const response = await axios.post(`${url}addCampus`, campus_Location);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// add college
export const addCollege = async (formValues) => {
  try {
    const response = await axios.post(`${url}addCollege`, formValues);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// add program
export const addProgram = async (data) => {
  try {
    const response = await axios.post(`${url}addProgram`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// add college
export const addMajor = async (data) => {
  try {
    const response = await axios.post(`${url}addMajor`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// delete campus
export const deleteCampus = async (id) => {
  try {
    const response = await axios.delete(`${url}deleteCampus/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteCollege = async (id) => {
  try {
    const response = await axios.delete(`${url}deleteCollege/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteProgram = async (id) => {
  try {
    const response = await axios.delete(`${url}deleteProgram/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteMajor = async (id) => {
  try {
    const response = await axios.delete(`${url}deleteMajor/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCampus = async (data) => {
  try {
    const response = await axios.put(`${url}updateCampus`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCollege = async (data) => {
  try {
    const response = await axios.put(`${url}updateCollege`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const updateProgram = async (data) => {
  try {
    const response = await axios.put(`${url}updateProgram`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const updateMajor = async (data) => {
  try {
    const response = await axios.put(`${url}updateMajor`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateSlot = async (data) => {
  try {
    const response = await axios.put(`${url}updateAreaSlot`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// assign student
export const assignStudent = async ({
  studentId,
  trainer_id,
  areaAssigned_id,
  companyName,
  trainerName,
  area
}) => {
  try {
    const response = await axios.put(`${url}assignStudent`, {
      studentId,
      trainer_id,
      areaAssigned_id,
      companyName,
      trainerName,
      area
    });
    return response.data;
  } catch (error) {}
};

//attendance request
export const attendanceRequest = async (id) => {
  try {
    const response = await axios.put(`${url}attendanceRequest`, { id });
    return response.data;
  } catch (error) {}
};

// time in api
export const addTimeIn = async ({ id, timeIn }) => {
  try {
    const response = await axios.put(`${url}timeIn`, { id, timeIn });
    return response.data;
  } catch (error) {
    throw new Error(error); // You can handle the error as needed
  }
};

// time in api
export const addTimeOut = async ({ id, timeOut, totalHours }) => {
  try {
    const response = await axios.put(`${url}timeOut`, {
      id,
      timeOut,
      totalHours,
    });
    return response.data;
  } catch (error) {
    throw new Error(error); // You can handle the error as needed
  }
};

// createAnnouncement
export const createAnnouncement = async (item) => {
  try {
    const response = await axios.post(`${url}createAnnouncement`, item, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error); // You can handle the error as needed
  }
};

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
export const getAdminList = async () => {
  try {
    const response = await axios.get(`${url}getAdminList`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// info
export const getSuperAdmin = async () => {
  try {
    const response = await axios.get(`${url}getSuperAdmin`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getDirector = async () => {
  try {
    const response = await axios.get(`${url}getDirector`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCoordinator = async () => {
  try {
    const response = await axios.get(`${url}getCoordinator`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTeacher = async () => {
  try {
    const response = await axios.get(`${url}getTeacher`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTrainer = async () => {
  try {
    const response = await axios.get(`${url}getTrainer`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getStudent = async () => {
  try {
    const response = await axios.get(`${url}getStudent`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCampus = async () => {
  try {
    const response = await axios.get(`${url}getCampus`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getStudentInfo = async (id) => {
  try {
    const response = await axios.get(`${url}getStudentInfo/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getStudentList = async () => {
  try {
    const response = await axios.get(`${url}getStudentList`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const verifyToken = async () => {
  try {
    const response = await axios.get(`${url}verify`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const verifyUser = async () => {
  try {
    const response = await axios.get(`${url}verify`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get student records timesheet/task
export const getTimesheet = async () => {
  try {
    const response = await axios.get(`${url}getTimesheet`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get requirements
export const getRequirement = async () => {
  try {
    const response = await axios.get(`${url}getRequirement`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get task
export const getTask = async () => {
  try {
    const response = await axios.get(`${url}getTask`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
// get announcement
export const getAnnouncement = async () => {
  try {
    const response = await axios.get(`${url}getAnnouncement`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// edit profile user

// edit direct profile
export const editDirectorProfile = async (item) => {
  try {
    const response = await axios.put(
      `${url}editProfileDirector`,
      { item },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

//edit super admin profiile
export const editSuperAdminProfile = async (item) => {
  try {
    const response = await axios.put(
      `${url}editSuperAdminProfile`,
      { item },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// edit coordinator profile
export const editCoordinatorProfile = async (item) => {
  try {
    const response = await axios.put(
      `${url}editProfileCoordinator`,
      { item },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// edit teacher profile
export const editTeacherProfile = async (item) => {
  try {
    const response = await axios.put(
      `${url}editProfileTeacher`,
      { item },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// edit teacher profile
export const editTrainerProfile = async (item) => {
  try {
    const response = await axios.put(
      `${url}editProfileTrainer`,
      { item },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const editStudentProfile = async (item) => {
  try {
    const response = await axios.put(
      `${url}editProfileStudent`,
      { item },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// change password
export const changeStudentPassword = async ({ oldPassword, newPassword }) => {
  try {
    const response = await axios.put(
      `${url}changeStudentPassword`,
      { oldPassword, newPassword },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// update profile picture
export const updateTeacherProfilePicture = async (formData) => {
  try {
    const response = await axios.put(
      `${url}updateTeacherProfilePicture`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCoordinatorProfilePicture = async (formData) => {
  try {
    const response = await axios.put(
      `${url}updateCoordinatorProfilePicture`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateDirectorProfilePicture = async (formData) => {
  try {
    const response = await axios.put(
      `${url}updateDirectorProfilePicture`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateSuperAdminProfilePicture = async (formData) => {
  try {
    const response = await axios.put(
      `${url}updateSuperAdminProfilePicture`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTrainerProfilePicture = async (formData) => {
  try {
    const response = await axios.put(
      `${url}updateTrainerProfilePicture`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateStudentProfilePicture = async (formData) => {
  try {
    const response = await axios.put(
      `${url}updateStudentProfilePicture`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// upload task
export const uploadTask = async ({description, date}) => {
  try {
    const response = await axios.post(`${url}uploadTask`, {description, date}, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadRequirement = async (formData) => {
  try {
    const response = await axios.post(`${url}uploadRequirement`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteRequirement = async (id) => {
  try {
    const response = await axios.delete(`${url}deleteRequirement/${id}`);
    return response.data;
  } catch (error) {
    throw error
  }
}

// add date range and get
export const getDateRange = async () => {
  try {
    const response = await axios.get(`${url}getDateRange`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// add date range and get
export const addDateRange = async (item) => {
  try {
    const response = await axios.post(`${url}addDateRange`, item, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// add date range and get
export const updateDateRange = async (item) => {
  try {
    const response = await axios.put(`${url}updateDateRange`, item, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// submit report
export const submitReport = async (item) => {
  try {
    const response = await axios.put(`${url}submitReport`, item);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const reportReport = async (item) => {
  try {
    const response = await axios.put(`${url}reportReport`, item);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeRole = async (item) => {
  try {
    const response = await axios.put(`${url}changeRole`, item);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//reset data
export const resetData = async (item) => {
  try {
    const response = await axios.put(`${url}resetData`, item, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};



//get user info role, director, coor, trainer et.c
export const getUser = async () => {
  try {
    const response = await axios.get(`${url}getUser`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get Notfication
export const getNotfication = async () => {
  try {
    const response = await axios.get(`${url}getNotfication`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// logout
export const logout = async () => {
  try {
    const response = await axios.post(
      `${url}logout`,
      {},
      { withCredentials: true }
    );
    return response.data.message;
  } catch (error) {
    throw error;
  }
};



export const verifyEmail = async (email) => {
  try {
    const response = await axios.post(`${url}verifyEmail`, {email: email}, {withCredentials:true});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const verifyPin = async (pin) => {
  try {
    const response = await axios.post(
      `${url}verifyPin`,
      {pin:pin},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const forgotpassword = async ({ password, username }) => {
  try {
    const response = await axios.put(`${url}forgotPassword`, { password, username });
    return response.data;
  } catch (error) {
    throw error;
  }
}

