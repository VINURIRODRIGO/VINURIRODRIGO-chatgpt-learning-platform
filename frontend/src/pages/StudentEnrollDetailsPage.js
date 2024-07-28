import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CourseRow from "../components/CourseRow";
import { displayInstructorCourses } from "../services/courseService";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

const StudentEnrollDetailsPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await displayInstructorCourses();
        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(
          error.response?.data?.message ||
            "Failed to fetch courses. Please try again."
        );
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

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
