import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "./ViewCreator.css";

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
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

  const handleDelete = async () => {
    const { error } = await supabase.from("creators").delete().eq("id", id);

    if (error) {
      console.error("Error deleting creator:", error.message);
      return;
    }

    navigate("/creators"); // Navigate back to the list of creators
  };

  if (!creator) return <p>Loading...</p>;

  return (
    <div className="view-creator">
      <h1 className="creator-name">{creator.name}</h1>
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="creator-image"
        />
      )}
      <p className="creator-description">{creator.description}</p>
      <a
        href={creator.url}
        target="_blank"
        rel="noopener noreferrer"
        className="view-button"
      >
        Visit {creator.name}'s Page
      </a>
      <Link to={`/creators/edit/${creator.id}`} className="edit-button">
        Edit
      </Link>
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default ViewCreator;
