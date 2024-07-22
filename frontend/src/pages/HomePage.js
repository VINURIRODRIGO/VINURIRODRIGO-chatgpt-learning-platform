import React from "react";
import CourseList from "../components/CourseList";
import ChatGPT from "../components/ChatGPT";

const HomePage = () => {
  return (
    <div>
      <h1>Online Learning Platform</h1>
      <CourseList />
      <ChatGPT />
    </div>
  );
};

export default HomePage;
