import React, { useState, useEffect } from 'react';
import '../index.css';
import Button from '../components/Button';
import { studentDetails } from '../services/userService';

const CourseRow = ({ course }) => {
  const [showStudents, setShowStudents] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (showStudents) {
      const fetchStudentDetails = async () => {
        try {
          const studentDetail = await Promise.all(
            course.enrolledStudents.map(studentId => studentDetails(studentId))
          );
          setStudents(studentDetail);
        } catch (error) {
          console.error("Failed to fetch student details", error);
        }
      };
      fetchStudentDetails();
    }
  }, [showStudents, course.enrolledStudents]);

  const toggleStudents = () => setShowStudents(!showStudents);

  return (
    <div className="course-row">
      <div className="course-details">
        <img src={course.image} alt={course.title} className="course-image" />
        <h2>{course.title}</h2>
        <Button className="enrolled-count" onClick={toggleStudents}>
          Student Count <span>{course.enrolledStudents.length}</span>
        </Button>
      </div>
      {showStudents && (
        <div className="student-list">
          {students.map((student, index) => (
            <p key={index}>
              {student.firstName} {student.lastName}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseRow;