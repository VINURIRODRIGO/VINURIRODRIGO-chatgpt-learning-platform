import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import {
  displayAllCourses,
  enrollCourse,
  displayCourseData,
} from "../services/courseService";
import { chatGpt } from "../services/gptService";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import Search from "../components/Search";
import "../index.css";

const StudentCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false); // Separate loading state for search
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [disableEffects, setDisableEffects] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (disableEffects) return;
    const fetchCourses = async () => {
      try {
        const courseData = await displayAllCourses();
        setCourses(courseData);
        setFilteredCourses(courseData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses. Please try again.");
        setLoading(false);
      }
    };
    fetchCourses();
  }, [disableEffects]);

  useEffect(() => {
    if (disableEffects) return;
    const results = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(results);
  }, [searchQuery, courses, disableEffects]);

  const handleEnroll = async (courseId) => {
    try {
      await enrollCourse(courseId);
      setSuccess("Successfully enrolled in the course!");
      setError("");
      setTimeout(() => setSuccess(""), 3000);
      const courseData = await displayAllCourses();
      setCourses(courseData);
      setFilteredCourses(courseData);
    } catch (err) {
      setError(
        err.message || "Failed to enroll in the course. Please try again."
      );
      setSuccess("");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setDisableEffects(true);
    setSearchLoading(true); // Start search loading
    try {
      const response = await chatGpt(query);
      const courseIds = response.map((course) => course.course_id);
      const courseDataPromises = courseIds.map((courseId) =>
        displayCourseData(courseId)
      );
      const courseDataArray = await Promise.all(courseDataPromises);
      const formattedCourses = courseDataArray.map((data) => ({
        _id: data.courseDetails._id,
        title: data.courseDetails.title,
        description: data.courseDetails.description,
        image: data.courseDetails.image,
        createdBy: {
          firstName: data.userDetails.firstName,
          lastName: data.userDetails.lastName,
        },
        enrolledStudents: data.courseDetails.enrolledStudents,
      }));
      console.log(`Filtered Course Details: ${formattedCourses}`);
      setCourses(formattedCourses);
      setFilteredCourses(formattedCourses);
      setLoading(false);
      setSearchLoading(false); // End search loading
    } catch (error) {
      console.error("ChatGPT API Error:", error);
      setError("Failed to fetch data from ChatGPT. Please try again.");
      setSuccess("");
      setSearchLoading(false); // End search loading
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleReset = async () => {
    setSearchQuery("");
    setDisableEffects(false);
    setLoading(true);
    try {
      const courseData = await displayAllCourses();
      setCourses(courseData);
      setFilteredCourses(courseData);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch courses. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="content-container">
          <h1>Available Courses</h1>
          <Search
            placeholder="Search for courses..."
            onSearch={handleSearch}
            onReset={handleReset}
          />
          {error && (
            <Alert
              message={error.toString()}
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
          {searchLoading ? ( // Display loading indicator for search
            <Loading />
          ) : filteredCourses.length === 0 ? (
            <p className="no-courses-message">
              No courses found matching your search criteria.
            </p>
          ) : (
            <div className="course-card-container">
              {filteredCourses.map((course, index) => (
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
                      {course.enrolledStudents.includes(userId)
                        ? "Enrolled"
                        : "Enroll"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentCoursesPage;
