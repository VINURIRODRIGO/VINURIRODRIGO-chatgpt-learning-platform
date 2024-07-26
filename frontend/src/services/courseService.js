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
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.response.data.message || error.message));
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
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.response.data.message || error.message));
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
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.response.data.message || error.message));
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
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.response.data.message || error.message));
  });
};

const enrollCourse = (courseId) => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${API_URL}/courses/enroll,
      data: courseId`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.response.data.message || error.message));
  });
};

const displayStudentCourses = (courseId) => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${API_URL}/courses/enrolled`,
      data: courseId,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.response.data.message || error.message));
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
