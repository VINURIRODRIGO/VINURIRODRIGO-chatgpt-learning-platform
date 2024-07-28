import React, { useState, useEffect } from 'react';
import '../index.css';
import Button from '../components/Button';
import { studentDetails } from '../services/userService';

/**
 * CourseRow Component
 * 
 * A component to display a course row with details and an expandable list of enrolled students.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.course - The course object containing course details.
 * 
 * @returns {JSX.Element} The rendered course row component.
 */
const CourseRow = ({ course }) => {
  const [showStudents, setShowStudents] = useState(false); // State to manage the visibility of the student list
  const [students, setStudents] = useState([]); // State to store student details
  const [error, setError] = useState(null); // State to store error message

  // useEffect to fetch student details when the student list is toggled
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
          setError("Failed to fetch student details.");
        }
      };
      fetchStudentDetails();
    }
  }, [showStudents, course.enrolledStudents]);

  // Function to toggle the visibility of the student list
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
          {error && <div className="error-message">{error}</div>}
          {students.map((student, index) => (
            <div key={student.id} className="student-detail">
              <p key={index}>
                <b>{student.firstName} {student.lastName}</b>
                &nbsp;&nbsp;&nbsp;
                 📧 <i>{student.email}</i>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseRow;