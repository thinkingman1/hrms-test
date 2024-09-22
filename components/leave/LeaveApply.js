"use client"; //NEED TO SET EMPLOYEE ID. Its NULL presently
import { useState } from 'react';

export default function ApplyLeave() {
    const [leaveData, setLeaveData] = useState({
        leave_type_id: '',
        start_date: '',
        end_date: '',
        reason: '',
        status: 'Pending'  // Default status
    });
    const [message, setMessage] = useState('');  // For displaying messages
    const [messageType, setMessageType] = useState('');  // To control the color of the message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeaveData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/leaves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leaveData)
            });
            if (response.ok) {
                setMessage('Leave application submitted successfully!');
                setMessageType('success');  // Set the message type to success
                setLeaveData({ leave_type_id: '', start_date: '', end_date: '', reason: '', status: 'Pending' }); // Reset form
            } else {
                throw new Error('Failed to submit leave application.');
            }
        } catch (error) {
            setMessage(error.message);
            setMessageType('error');  // Set the message type to error
        }
    };

    return (
        <div>
            <h1>Apply for Leave</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="leave_type_id">Leave Type:</label>
                <select name="leave_type_id" value={leaveData.leave_type_id} onChange={handleChange} required>
                    <option value="">Select Leave Type</option>
                    <option value="1">Casual Leave</option>
                    <option value="2">Sick Leave</option>
                    <option value="3">Earned Leave</option>
                </select>

                <label htmlFor="start_date">Start Date:</label>
                <input type="date" name="start_date" value={leaveData.start_date} onChange={handleChange} required />

                <label htmlFor="end_date">End Date:</label>
                <input type="date" name="end_date" value={leaveData.end_date} onChange={handleChange} required />

                <label htmlFor="reason">Reason:</label>
                <textarea name="reason" value={leaveData.reason} onChange={handleChange} required></textarea>

                <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}>Submit</button>
            </form>
            {message && <p style={{ color: messageType === 'success' ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
}
