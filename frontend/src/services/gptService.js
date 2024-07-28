import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const chatGpt = (userSearch) => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${API_URL}/chat`,
      data: {
        message: userSearch,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("API Response:", response);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error.response?.data || error.message);
        reject(error.response?.data || error.message);
      });
  });
};
export { chatGpt };
