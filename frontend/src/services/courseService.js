import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Add a new course.
 * @param {Object} courseData - The course data.
 * @returns {Promise<Object>} The response data.
 */
const addCourse = async (courseData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${API_URL}/courses`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

/**
 * Get courses by the instructor.
 * @returns {Promise<Object>} The response data.
 */
const displayInstructorCourses = async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${API_URL}/courses/instructor/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

/**
 * Get all courses.
 * @returns {Promise<Object>} The response data.
 */
const displayAllCourses = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data?.error || error.message);
    throw error.response?.data?.error || error.message;
  }
};

/**
 * Edit course details.
 * @param {string} courseId - The ID of the course to edit.
 * @param {Object} courseData - The updated course data.
 * @returns {Promise<Object>} The response data.
 */
const editCourseDetails = async (courseId, courseData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `${API_URL}/courses/${courseId}`,
      courseData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data?.error || error.message);
    throw error.response?.data?.error || error.message;
  }
};

/**
 * Enroll in a course.
 * @param {string} courseId - The ID of the course to enroll in.
 * @returns {Promise<Object>} The response data.
 */
const enrollCourse = async (courseId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${API_URL}/courses/enroll/`,
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error.response?.data?.error || error.message;
  }
};

/**
 * Get courses enrolled by a student.
 * @returns {Promise<Object>} The response data.
 */
const displayStudentCourses = async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/courses/enrolled/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data?.error || error.message);
    throw error.response?.data?.error || error.message;
  }
};

/**
 * Get data of a specific course.
 * @param {string} courseId - The ID of the course to get data for.
 * @returns {Promise<Object>} The response data.
 */
const displayCourseData = async (courseId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data?.error || error.message);
    throw error.response?.data?.error || error.message;
  }
};

export {
  addCourse,
  displayInstructorCourses,
  displayStudentCourses,
  displayAllCourses,
  editCourseDetails,
  enrollCourse,
  displayCourseData,
};
