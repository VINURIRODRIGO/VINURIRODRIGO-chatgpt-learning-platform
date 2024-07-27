import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const addCourse = (userData) => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${API_URL}/courses`,
      data: userData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("API Response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error.response?.data || error.message);
        reject(error.response?.data || error.message);
      });
  });
};

const displayInstructorCourses = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${API_URL}/courses/instructor/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("API Response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error.response?.data || error.message);
        reject(error.response?.data || error.message);
      });
  });
};

const displayAllCourses = () => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${API_URL}/courses`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("API Response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error(
          "API Error:",
          error.response?.data?.error || error.message
        );
        reject(error.response?.data?.error || error.message);
      });
  });
};

const editCourseDetails = (courseId, courseData) => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: `${API_URL}/courses/${courseId}`,
      data: courseData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("API Response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error(
          "API Error:",
          error.response?.data?.error || error.message
        );
        reject(error.response?.data?.error || error.message);
      });
  });
};

const enrollCourse = (courseId) => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${API_URL}/courses/enroll`,
      data: { courseId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("API Response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error(
          "API Error:",
          error.response?.data?.error || error.message
        );
        reject(error.response?.data?.error || error.message);
      });
  });
};

const displayStudentCourses = () => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${API_URL}/courses/enrolled`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("API Response:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error(
          "API Error:",
          error.response?.data?.error || error.message
        );
        reject(error.response?.data?.error || error.message);
      });
  });
};

export {
  addCourse,
  displayInstructorCourses,
  displayStudentCourses,
  displayAllCourses,
  editCourseDetails,
  enrollCourse,
};
