import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import { displayAllCourses, enrollCourse } from "../services/courseService";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import Search from "../components/Search";
import "../index.css";

const StudentCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseData = await displayAllCourses();
        setCourses(courseData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch courses. Please try again.");
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await enrollCourse({ courseId });
      setSuccess("Successfully enrolled in the course!");
      setError("");
      setTimeout(() => setSuccess(""), 3000);
      const courseData = await displayAllCourses();
      setCourses(courseData);
    } catch (error) {
      setError(error || "Failed to enroll in the course. Please try again.");
      setSuccess("");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleSearch = async (query) => {
    // Implement search functionality here
    // Example: You could filter courses based on title or other criteria
    // Modify course fetching logic to filter based on query
    try {
      const filteredCourses = await displayAllCourses(query);
      setCourses(filteredCourses);
    } catch (error) {
      setError("Failed to search courses. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <h1>Student Courses</h1>
      <Search placeholder="Search courses..." onSearch={handleSearch} />
      <div className="course-card-container">
        {loading ? (
          <Loading />
        ) : (
          <>
            {error && (
              <Alert
                message={error}
                type="error"
                onClose={() => setError("")}
              />
            )}
            {success && (
              <Alert
                message={success}
                type="success"
                onClose={() => setSuccess("")}
              />
            )}

            {courses.map((course, index) => (
              <Card
                key={index}
                title={course.title}
                content={course.description}
              >
                <p>
                  <b>
                    Instructor: {course.createdBy.firstName}{" "}
                    {course.createdBy.lastName}
                  </b>
                </p>
                <div>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="card-image"
                  />
                </div>
                <div className="button-center">
                  <Button
                    type="button"
                    onClick={() => handleEnroll(course._id)}
                    className="enroll-button"
                    disabled={course.enrolledStudents.includes(userId)}
                  >
                    Enroll
                  </Button>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentCoursesPage;
