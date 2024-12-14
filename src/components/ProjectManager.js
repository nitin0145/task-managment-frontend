import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskManager from './TaskManager';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects`);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects', error);
        }
    };

    const handleCreateProject = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/projects`, { name: projectName });
            setProjectName('');
            fetchProjects();
        } catch (error) {
            console.error('Error creating project', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div>
            <h2>Project Manager</h2>
            <div>
                <input
                    type="text"
                    placeholder="Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <button onClick={handleCreateProject}>Create Project</button>
            </div>
            <ul>
                {projects.map((project) => (
                    <li key={project._id} onClick={() => setSelectedProject(project._id)}>
                        {project.name}
                    </li>
                ))}
            </ul>
            {selectedProject && <TaskManager projectId={selectedProject} />}
        </div>
    );
};

export default ProjectManager;
