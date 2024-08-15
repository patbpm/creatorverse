import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './AddCreator.css';

const AddCreator = () => {
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  const handleChange = (e) => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('creators')
        .insert([creator]);

      if (error) throw error;

      navigate('/creators'); // Redirect to the creators list page
    } catch (error) {
      console.error('Error adding creator:', error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Add a New Content Creator</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={creator.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="input"
          />
        </label>
        <label>
          URL
          <input
            type="url"
            name="url"
            value={creator.url}
            onChange={handleChange}
            placeholder="URL"
            required
            className="input"
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={creator.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="textarea"
          />
        </label>
        <label>
          Image URL (optional)
          <input
            type="url"
            name="imageURL"
            value={creator.imageURL}
            onChange={handleChange}
            placeholder="Image URL"
            className="input"
          />
        </label>
        <button type="submit" className="button primary">
          Add Creator
        </button>
      </form>
    </div>
  );
};

export default AddCreator;
