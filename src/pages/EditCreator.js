// src/pages/EditCreator.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  useEffect(() => {
    // Fetch the content creator details to pre-fill the form
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching creator:", error.message);
        return;
      }

      setCreator(data);
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update the content creator's information via Supabase
    const { error } = await supabase
      .from("creators")
      .update(creator)
      .eq("id", id);

    if (error) {
      console.error("Error updating creator:", error.message);
      return;
    }

    navigate(`/creators/${id}`);
  };

  return (
    <div className="container">
        <div className="edit-creator">
      <h1 className="edit-creator-title">Edit {creator.name}</h1>
      <form onSubmit={handleSubmit} className="edit-creator-form">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={creator.name}
            onChange={handleChange}
            placeholder="Name"
            className="input"
            required
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
            className="input"
            required
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={creator.description}
            onChange={handleChange}
            placeholder="Description"
            className="textarea"
            required
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
        <button type="submit" className="button primary save-changes-button">
          Save Changes
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default EditCreator;
