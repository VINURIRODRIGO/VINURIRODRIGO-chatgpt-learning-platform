import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CourseRow from "../components/CourseRow";
import { displayInstructorCourses } from "../services/courseService";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

/**
 * Student Enroll Details Page
 *
 * Displays the list of courses created by the instructor
 * and the details of students enrolled in each course.
 */
const StudentEnrollDetailsPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * Fetches the courses created by the instructor on component mount.
   */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await displayInstructorCourses();
        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to fetch courses. Please try again."
        );
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Automatically clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="page-container">
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="content-container">
          <h1>Student Enroll Details</h1>
          {error && (
            <Alert type="error" message={error} onClose={() => setError("")} />
          )}
          <div className="course-list">
            {courses.length === 0 ? (
              <p className="no-courses-message">No courses available.</p>
            ) : (
              courses.map((course, index) => (
                <CourseRow key={index} course={course} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEnrollDetailsPage;
