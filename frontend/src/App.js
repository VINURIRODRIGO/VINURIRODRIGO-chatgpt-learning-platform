import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import StudentSignupPage from "./pages/StudentSignupPage";
import InstructorSignup from "./pages/InstructorSignupPage";
import InstructorCoursesPage from "./pages/InstructorCoursesPage";
import StudentCoursesPage from "./pages/StudentCoursesPage";
import EnrolledCoursesDisplayPage from "./pages/EnrolledCoursesDisplayPage";
import StudentEnrollDetailsPage from "./pages/StudentEnrollDetailsPage";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorPage from "./pages/ErrorPage";

/**
 * Router configuration.
 */
const router = createBrowserRouter([
  {
    path: "/student/course-list",
    element: <EnrolledCoursesDisplayPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/student/signup",
    element: <StudentSignupPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "instructor/course",
    element: <InstructorCoursesPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "student/course",
    element: <StudentCoursesPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "instructor/signup",
    element: <InstructorSignup />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "instructor/student-enroll-details",
    element: <StudentEnrollDetailsPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

/**
 * Main App Component
 *
 * Contains the router provider wrapped with an error boundary.
 *
 * @returns {JSX.Element} The application component.
 */
function App() {
  return (
    <>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  );
}

export default App;
