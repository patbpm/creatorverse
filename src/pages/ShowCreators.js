// src/pages/ShowCreators.js

import React, { useState, useEffect } from 'react';
import Card from '../components/Card'; 
import { supabase } from '../client'; 
import './CreatorList.css';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of content creators from Supabase
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase
          .from('creators') 
          .select('*');

        if (error) throw error;

        setCreators(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (creators.length === 0) return <p>No content creators found.</p>;

  return (
    <div className="show-creators">
      
      <div className="creators-list">
        {creators.map((creator) => (
          <Card
            id={creator.id}
            name={creator.name}
            url={creator.url}
            description={creator.description}
            imageURL={creator.imageURL}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowCreators;
