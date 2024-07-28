import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const userDetails = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${API_URL}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

const studentDetails = (userId) => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${API_URL}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
export { userDetails, studentDetails };
