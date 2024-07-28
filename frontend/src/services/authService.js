import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Sign up a student user.
 * @param {Object} userData - The user data for signup.
 * @returns {Promise<Object>} The response data.
 */
const studentSignup = async (userData) => {
  try {
    console.log("Student Signup Request:", userData);
    const response = await axios.post(
      `${API_URL}/auth/signup/student, userData`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Sign up an instructor user.
 * @param {Object} userData - The user data for signup.
 * @returns {Promise<Object>} The response data.
 */
const instructorSignup = async (userData) => {
  try {
    console.log("Instructor Signup Request:", userData);
    const response = await axios.post(
      `${API_URL}/auth/signup/instructor, userData`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Log in a user.
 * @param {Object} userData - The user data for login.
 * @returns {Promise<Object>} The response data.
 */
const login = async (userData) => {
  try {
    console.log("Login Request:", userData);
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

export { studentSignup, instructorSignup, login };
