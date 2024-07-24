import React from 'react';
import '../index.css';

const Card = ({ title, content, backgroundColor, children }) => {
  return (
    <div className="card custom-card-background" style={{ backgroundColor }}>
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {content && <p className="card-text">{content}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card;