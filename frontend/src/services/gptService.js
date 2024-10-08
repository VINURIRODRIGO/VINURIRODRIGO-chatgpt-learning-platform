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

  return axios
    .post(
      `${API_URL}/chat`,
      { message: userSearch },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("API Error:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    });
};

export { chatGpt };
