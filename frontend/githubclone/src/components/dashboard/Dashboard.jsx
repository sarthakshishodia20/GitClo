import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

import "../Navbar.css"

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/user/${userId}`);
        const data = await response.json();
        console.log("Fetched Repositories:", data);
        setRepositories(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (err) {
        console.error("Error while fetching repositories", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/all`);
        const data = await response.json();
        console.log("Fetched Suggested Repositories:", data);
        setSuggestedRepositories(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (err) {
        console.error("Error while fetching suggested repositories", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <div className="left-panel">
          <h2>Suggested Repositories</h2>
          {suggestedRepositories.length > 0 ? (
            suggestedRepositories.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </div>
            ))
          ) : (
            <p>No suggested repositories available.</p>
          )}
        </div>
        <div className="main-panel">
          <h2>Your Repositories</h2>
          {repositories.length > 0 ? (
            repositories.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </div>
            ))
          ) : (
            <p>No repositories available.</p>
          )}
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <h2>Search Results</h2>
          {searchResults.length > 0 ? (
            searchResults.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </div>
            ))
          ) : (
            <p>No search results found.</p>
          )}
        </div>
        <div className="right-panel">
          <h2>Upcoming Events</h2>
          <ul>
            <li>
              <p>Tech Conference 20-Nov</p>
            </li>
            <li>
              <p>Developer Meet 19-Nov</p>
            </li>
            <li>
              <p>React Summit 23-Sep</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
