import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Navbar from "../components/Navbar";
import Settings from "./Settings";
import Courses from "./InstructorCoursesPage";

const HomePage = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/settings" component={Settings} />
          <Route path="/courses" component={Courses} />
        </Routes>
      </div>
    </Router>
  );
};

export default HomePage;