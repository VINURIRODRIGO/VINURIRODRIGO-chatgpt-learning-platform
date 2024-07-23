import React from 'react';
import '/frontend/src/index.css'; // Optional: For styling the card

const Card = ({ title, content, imageUrl, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
};

export default Card;