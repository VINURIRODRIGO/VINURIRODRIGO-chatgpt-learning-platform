import React, { useState, useEffect } from "react";
import {
  addCourse,
  displayInstructorCourses,
  editCourseDetails,
} from "../services/courseService";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import Popup from "../components/Popup";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import FileUpload from "../components/FileUpload";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import "../index.css";

/**
 * Instructor Courses Page
 *
 * Displays the list of courses created by the instructor and allows adding and editing courses.
 */
const InstructorCoursesPage = () => {
  // State variables for managing the component's data and UI states.
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [courses, setCourses] = useState([]);
  const [shouldFetchCourses, setShouldFetchCourses] = useState(true);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to open the "Add Course" popup.
  const openPopup = () => setIsPopupOpen(true);

  // Function to close the "Add Course" popup and reset input fields.
  const closePopup = () => {
    setIsPopupOpen(false);
    setTitle("");
    setDescription("");
    setFile(null);
    setFileName("");
  };

  // Function to open the "Edit Course" popup with pre-filled data.
  const openEditPopup = (course) => {
    setCurrentCourse(course);
    setTitle(course.title);
    setDescription(course.description);
    setFile(null);
    setFileName("");
    setIsEditPopupOpen(true);
  };

  // Function to close the "Edit Course" popup and reset input fields.
  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setCurrentCourse(null);
    setTitle("");
    setDescription("");
    setFile(null);
    setFileName("");
  };

  // useEffect hook to fetch the list of courses created by the instructor on component mount or when shouldFetchCourses changes.
  useEffect(() => {
    if (shouldFetchCourses) {
      const fetchCourses = async () => {
        setLoading(true);
        try {
          const coursesData = await displayInstructorCourses();
          setCourses(coursesData);
          setShouldFetchCourses(false);
        } catch (error) {
          setError(
            error.message || "Error fetching courses. Please try again."
          );
          setTimeout(() => setError(""), 3000);
        } finally {
          setLoading(false);
        }
      };
      fetchCourses();
    }
  }, [shouldFetchCourses]);

  // Function to handle the submission of the "Add Course" popup.
  const handlePopupButtonClick = async () => {
    if (!title || !description || !file) {
      setError("All fields are required.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const newCourse = {
        title,
        description,
        image: base64Image,
      };

      try {
        await addCourse(newCourse);
        setSuccess("Course added successfully");
        setTimeout(() => setSuccess(""), 3000);
        closePopup();
        setShouldFetchCourses(true);
      } catch (error) {
        setError(`Error: ${error.message}`);
        setTimeout(() => setError(""), 3000);
      }
    };

    reader.readAsDataURL(file);
  };

  // Function to handle the submission of the "Edit Course" popup.
  const handleEditButtonClick = async () => {
    if (!title || !description) {
      setError("Title and description are required.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const updatedCourse = {
      title,
      description,
      image: currentCourse.image,
      createdBy: currentCourse.createdBy,
      enrolledStudents: currentCourse.enrolledStudents,
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        updatedCourse.image = reader.result;

        try {
          await editCourseDetails(currentCourse._id, updatedCourse);
          setSuccess("Course updated successfully");
          setTimeout(() => setSuccess(""), 3000);
          closeEditPopup();
          setShouldFetchCourses(true);
        } catch (error) {
          setError(`Error: ${error.message}`);
          setTimeout(() => setError(""), 3000);
        }
      };
      reader.readAsDataURL(file);
    } else {
      try {
        await editCourseDetails(currentCourse._id, updatedCourse);
        setSuccess("Course updated successfully");
        setTimeout(() => setSuccess(""), 3000);
        closeEditPopup();
        setShouldFetchCourses(true);
      } catch (error) {
        setError(`Error: ${error.message}`);
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  // Function to handle changes in the description field.
  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  // Function to handle changes in the file upload field.
  const handleFileChange = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
      setFileName(files[0].name);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      {loading ? (
        <Loading message="Fetching courses..." />
      ) : (
        <>
          <h1>Home</h1>
          <div className="button-left">
            <Button type="button" onClick={openPopup}>
              Add Course
            </Button>
          </div>
          {courses.length === 0 ? (
            <div className="no-courses-message">No courses available.</div>
          ) : (
            <div className="course-card-container">
              {courses.map((course, index) => (
                <Card
                  key={index}
                  title={course.title}
                  content={course.description}
                >
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
                      className="edit-button"
                      onClick={() => openEditPopup(course)}
                    >
                      Edit
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
      {isPopupOpen && (
        <Popup
          title="Add New Course"
          buttonText="Add"
          onButtonClick={handlePopupButtonClick}
          onClose={closePopup}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Course Title:"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>
              <Textarea
                value={description}
                onChange={handleChange}
                placeholder="Add a description..."
                rows={5}
                cols={40}
                maxLength={250}
              />
              <p>Character count: {description.length}/250</p>
              <FileUpload
                fileTypes={["image/png", "image/jpeg"]}
                onFileChange={handleFileChange}
                placeholder="Choose file"
                buttonText="Upload Image"
                fileName={fileName}
              />
            </div>
          </form>
        </Popup>
      )}

      {isEditPopupOpen && (
        <Popup
          title="Edit Course"
          buttonText="Update"
          onButtonClick={handleEditButtonClick}
          onClose={closeEditPopup}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Course Title:"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>
              <Textarea
                value={description}
                onChange={handleChange}
                placeholder="Add a description..."
                rows={5}
                cols={40}
                maxLength={250}
              />
              <p>Character count: {description.length}/250</p>
              <FileUpload
                fileTypes={["image/png", "image/jpeg"]}
                onFileChange={handleFileChange}
                placeholder="Choose file"
                buttonText="Upload Image"
                fileName={fileName}
              />
            </div>
          </form>
        </Popup>
      )}

      {error && (
        <Alert message={error} type="error" onClose={() => setError("")} />
      )}
      {success && (
        <Alert
          message={success}
          type="success"
          onClose={() => setSuccess("")}
        />
      )}
    </div>
  );
};

export default InstructorCoursesPage;
