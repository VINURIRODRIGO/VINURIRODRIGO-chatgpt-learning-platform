import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const addCourse = (userData) => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: ` ${API_URL}/courses`,
      data: userData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        console.log(response);
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
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
      .then(function (response) {
        console.log(response);
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};
const displayEnrolledCourses = () => {
  const userId = localStorage.getItem("userId");
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${API_URL}/courses/instructor/${userId}`,
    })
      .then(function (response) {
        console.log(response);
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};
export { addCourse, displayInstructorCourses, displayEnrolledCourses };
