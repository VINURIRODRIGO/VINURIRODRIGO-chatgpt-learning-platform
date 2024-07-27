import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { displayStudentCourses } from "../services/courseService";

const EnrolledCoursesDisplayPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found in local storage.");
        }

        const allCourses = await displayStudentCourses();
        const filteredCourses = allCourses.filter((course) =>
          course.enrolledStudents.includes(userId)
        );

        setCourses(filteredCourses);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        setTimeout(() => setError(""), 3000);
      }
    };

    fetchEnrolledCourses();
  }, []);

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
          <Loading />
        ) : error ? (
          <Alert message={error} type="error" onClose={() => setError("")} />
        ) : (
          <Table data={courses} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default EnrolledCoursesDisplayPage;
