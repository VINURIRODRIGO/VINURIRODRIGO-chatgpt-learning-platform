import React from "react";
import Table from "../components/Table";
import Navbar from "../components/Navbar";
import { displayEnrolledCourses } from "../services/authService";

const EnrolledCoursesDisplayPage = () => {
  const courses = [
    {
      image: "https://via.placeholder.com/150",
      name: "Introduction to Programming",
      instructor: "John Doe",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Advanced Data Structures",
      instructor: "Jane Smith",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Machine Learning Basics",
      instructor: "Jim Brown",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Introduction to Programming",
      instructor: "John Doe",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Advanced Data Structures",
      instructor: "Jane Smith",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Machine Learning Basics",
      instructor: "Jim Brown",
    },
  ];
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
      accessor: "name",
    },
    {
      header: "Instructor",
      accessor: "instructor",
    },
  ];

  return (
    <div className="page-container">
      <Navbar />
      <div className="selected-courses-page">
        <h1>Selected Courses</h1>
        <Table data={courses} columns={columns} />
      </div>
    </div>
  );
};

export default EnrolledCoursesDisplayPage;
