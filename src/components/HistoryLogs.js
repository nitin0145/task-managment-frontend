import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoryLogs = () => {
    const [logs, setLogs] = useState([]);

    const fetchLogs = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/logs`);
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs', error);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <div>
            <h2>History Logs</h2>
            <ul>
                {logs.map((log) => (
                    <li key={log._id}>
                        Task: {log.taskId} | Start: {new Date(log.startTime).toLocaleString()} | End:{' '}
                        {log.endTime ? new Date(log.endTime).toLocaleString() : 'In Progress'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryLogs;
