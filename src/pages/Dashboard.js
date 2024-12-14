import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(response.data);
      } catch (error) {
        alert('Error fetching projects');
      }
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Projects</h3>
        <ul>
          {projects.map((project) => (
            <li key={project._id}>{project.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
