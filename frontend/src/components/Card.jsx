import React from 'react';
import '../index.css';
/**
 * Card Component
 * 
 * A reusable card component for displaying content with an optional background color.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title to display in the card.
 * @param {string} props.content - The main content of the card.
 * @param {string} props.backgroundColor - The background color for the card.
 * @param {React.ReactNode} props.children - Additional elements to display inside the card.
 * 
 * @returns {JSX.Element} The rendered card component.
 */
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