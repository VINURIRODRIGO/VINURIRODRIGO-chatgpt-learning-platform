import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Get details of the current user.
 * @returns {Promise<Object>} The response data.
 */
const userDetails = async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

/**
 * Get details of a specific student.
 * @param {string} userId - The ID of the student.
 * @returns {Promise<Object>} The response data.
 */
const studentDetails = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export { userDetails, studentDetails };
