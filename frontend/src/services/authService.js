import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const studentSignup = (userData) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${API_URL}/auth/signup/student`,
      data: userData,
    })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

const instructorSignup = async (userData) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${API_URL}/auth/signup/instructor`,
      data: userData,
    })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

const login = async (userData) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${API_URL}/auth/login`,
      data: userData,
    })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

export {
  studentSignup,
  login,
  instructorSignup,
};