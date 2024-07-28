import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Sends a user search query to the ChatGPT API and returns the response.
 *
 * @param {string} userSearch - The user's search query to be sent to the ChatGPT API.
 * @returns {Promise} - A promise that resolves with the API response data or rejects with an error message.
 */
const chatGpt = (userSearch) => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: ` ${API_URL}/chat`,
      data: {
        message: userSearch,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error.response?.data || error.message);
        reject(error.response?.data || error.message);
      });
  });
};

export { chatGpt };
