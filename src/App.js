import React, { useState, useEffect } from "react";
import { useRoutes, Link } from "react-router-dom";
import { supabase } from "./client";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import AddCreator from "./pages/AddCreator";
import "./App.css";

function App() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase.from("creators").select("*");

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

  const routes = useRoutes([
    {
      path: "/creators",
      element: (
        <ShowCreators creators={creators} loading={loading} error={error} />
      ),
    },
    { path: "/creators/add", element: <AddCreator /> },
    { path: "/creators/:id", element: <ViewCreator /> },
    { path: "/creators/edit/:id", element: <EditCreator /> },
    {
      path: "/",
      element: (
        <ShowCreators creators={creators} loading={loading} error={error} />
      ),
    },
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-title">CREATORVERSE</h1>
        <nav className="nav-bar">
          <Link to="/creators">
            <button className="add-creator-button">VIEW ALL CREATORS</button>
          </Link>
          <Link to="/creators/add">
            <button className="add-creator-button">ADD A CREATOR</button>
          </Link>
        </nav>
      </header>
      <main>{routes}</main>
    </div>
  );
}

export default App;
