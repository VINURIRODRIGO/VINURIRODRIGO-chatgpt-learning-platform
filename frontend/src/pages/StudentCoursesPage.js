import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";

const StudentCoursesPage = () => {
  const cardData = Array.from({ length: 6 }, (_, index) => ({
    title: `Course ${index + 1}`,
    content: `Description for Course ${index + 1}`,
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC6935JAyj97E_D59sm2yjfl9H__ruB1yjbQ&s`,
  }));

  return (
    <div className="page-container">
      <Navbar />
      <div className="course-card-container">
        {cardData.map((card, index) => (
          <Card key={index} title={card.title} content={card.content}>
            <div>
              <img src={card.imageUrl} alt={"title"} className="card-image" />
            </div>
            <div className="button-center">
              <Button type="submit" className="edit-button">
                {" "}
                View{" "}
              </Button>
              <Button type="submit" className="delete-button">
                {" "}
                Delete{" "}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentCoursesPage;
