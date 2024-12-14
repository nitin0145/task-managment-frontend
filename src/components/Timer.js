import React, { useState } from 'react';
import axios from 'axios';

const Timer = ({ taskId }) => {
    const [timer, setTimer] = useState({ isRunning: false, logId: null });

    const startTimer = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/timelog/start`, { taskId });
            setTimer({ isRunning: true, logId: response.data.timeLog._id });
        } catch (error) {
            console.error('Error starting timer', error);
        }
    };

    const stopTimer = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/timelog/stop`, { logId: timer.logId });
            setTimer({ isRunning: false, logId: null });
        } catch (error) {
            console.error('Error stopping timer', error);
        }
    };

    return (
        <div>
            <button onClick={startTimer} disabled={timer.isRunning}>
                Start Timer
            </button>
            <button onClick={stopTimer} disabled={!timer.isRunning}>
                Stop Timer
            </button>
        </div>
    );
};

export default Timer;
