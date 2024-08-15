import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ id, name, url, description, imageURL }) => {
  return (
    <div className="card">
    <Link to={`/creators/${id}`} >
     {imageURL && (
        <img src={imageURL} alt={name} className="card-image" />
      )}
    </Link>
      
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-description">{description}</p>
        <div className="card-buttons">
          <a
            href={url}
            className="button primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit
          </a>
          <Link to={`/creators/edit/${id}`} className="button secondary">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
