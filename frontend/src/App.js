import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/LoginPage";
import StudentSignup from "./pages/StudentSignupPage";
import InstructorSignup from "./pages/InstructorSignupPage";
import InstructorCoursesPage from "./pages/InstructorCoursesPage";
import StudentCoursesPage from "./pages/StudentCoursesPage";
import EnrolledCoursesDisplayPage from "./pages/EnrolledCoursesDisplayPage";
import StudentEnrollDetailsPage from "./pages/StudentEnrollDetailsPage";

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
  {
    path: "instructor/student-enroll-details",
    element: <StudentEnrollDetailsPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
