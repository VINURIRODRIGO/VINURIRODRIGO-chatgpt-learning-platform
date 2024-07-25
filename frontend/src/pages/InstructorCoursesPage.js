import React, { useState, useEffect } from "react";
import { addCourse, displayInstructorCourses } from "../services/authService";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import Popup from "../components/Popup";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import FileUpload from "../components/FileUpload";

const InstructorCoursesPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [courses, setCourses] = useState([]);
  const [shouldFetchCourses, setShouldFetchCourses] = useState(true);

  useEffect(() => {
    if (shouldFetchCourses) {
      const fetchCourses = async () => {
        try {
          const coursesData = await displayInstructorCourses();
          setCourses(coursesData);
          setShouldFetchCourses(false);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };

      fetchCourses();
    }
  }, [shouldFetchCourses]);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    setTitle("");
    setDescription("");
    setFile(null);
    setFileName("");
  };

  const handlePopupButtonClick = async () => {
    if (!title || !description || !file) {
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
        alert("Course added successfully");
        setIsPopupOpen(false);
        setTitle("");
        setDescription("");
        setFile(null);
        setFileName("");
        setShouldFetchCourses(true);
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
      setFileName(files[0].name);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <h1 style={{ fontSize: "45px", margin: "0%" }}>My Courses</h1>
      <div className="button-left">
        <Button type="button" onClick={openPopup}>
          Add Course
        </Button>
      </div>
      <div className="course-card-container">
        {courses.map((course, index) => (
          <Card key={index} title={course.title} content={course.description}>
            <div>
              <img
                src={course.image}
                alt={course.title}
                className="card-image"
              />
            </div>
            <div className="button-center">
              <Button type="button" className="edit-button">
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>

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
    </div>
  );
};

export default InstructorCoursesPage;
