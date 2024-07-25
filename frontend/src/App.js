import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import StudentSignup from "./pages/StudentSignup";
import InstructorSignup from "./pages/InstructorSignup";
import InstructorCoursesPage from "./pages/InstructorCoursesPage";
import StudentCoursesPage from "./pages/StudentCoursesPage";
import EnrolledCoursesDisplayPage from "./pages/EnrolledCoursesDisplayPage";

const router = createBrowserRouter([
  {
    path: "/student/course-list",
    element: <EnrolledCoursesDisplayPage />,
  },
  {
    path: "/student/signup",
    element: <StudentSignup />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "instructor/course",
    element: <InstructorCoursesPage />,
  },
  {
    path: "student/course",
    element: <StudentCoursesPage />,
  },
  {
    path: "instructor/signup",
    element: <InstructorSignup />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
