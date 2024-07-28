import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { displayStudentCourses } from "../services/courseService";

/**
 * Enrolled Courses Display Page
 *
 * Displays the list of courses a student is enrolled in.
 */
const EnrolledCoursesDisplayPage = () => {
  // State variables to manage courses data, loading state, and error messages.
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect hook to fetch enrolled courses on component mount.
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        // Retrieve the user ID from local storage.
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("Unauthorized. Please Sign In.");
        }

        // Fetch all enrolled courses for the user.
        const allCourses = await displayStudentCourses();
        setCourses(allCourses);
        setLoading(false);
      } catch (err) {
        // Handle errors and set error state.
        setError(err.message || "An error occurred.");
        setLoading(false);
        setTimeout(() => setError(""), 3000); // Clear error message after 3 seconds.
      }
    };

    fetchEnrolledCourses();
  }, []);

  // Define the columns for the courses table.
  const columns = [
    {
      header: "Course Image",
      accessor: "image",
      render: (image) => (
        <img src={image} alt="Course" style={{ width: "150px" }} />
      ),
    },
    {
      header: "Course Name",
      accessor: "title",
    },
    {
      header: "Instructor",
      accessor: "createdBy",
      render: (createdBy) => (
        <span>
          {createdBy.firstName} {createdBy.lastName}
        </span>
      ),
    },
  ];

  return (
    <div className="page-container">
      <Navbar />
      <div className="selected-courses-page">
        <h1>Selected Courses</h1>
        {loading ? (
          <Loading /> // Display loading spinner while data is being fetched.
        ) : error ? (
          <Alert message={error} type="error" onClose={() => setError("")} /> // Display error alert if there's an error.
        ) : (
          <Table
            data={courses}
            columns={columns}
            noDataMessage="No Courses Enrolled"
          /> // Display courses table if data is available.
        )}
      </div>
    </div>
  );
};

export default EnrolledCoursesDisplayPage;
