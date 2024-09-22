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
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"> {/* Updated container */}
          <h3 className="text-lg font-semibold mb-4 text-center">Apply for Leave</h3> {/* Updated title */}
          <form onSubmit={handleSubmit} className="space-y-4"> {/* Updated form structure */}
              <div className="flex flex-col">
                  <label htmlFor="leave_type_id" className="mb-1 bg-gray-200 p-2 font-bold text-center">Leave Type:</label>
                  <select name="leave_type_id" value={leaveData.leave_type_id} onChange={handleChange} required className="p-2 border rounded"> {/* Updated select */}
                      <option value="">Select Leave Type</option>
                      <option value="1">Casual Leave</option>
                      <option value="2">Sick Leave</option>
                      <option value="3">Earned Leave</option>
                  </select>
              </div>
  
              <div className="flex flex-col">
                  <label htmlFor="start_date" className="mb-1 bg-gray-200 p-2 font-bold text-center">Start Date:</label>
                  <input type="date" name="start_date" value={leaveData.start_date} onChange={handleChange} required className="p-2 border rounded" /> {/* Updated input */}
              </div>
  
              <div className="flex flex-col">
                  <label htmlFor="end_date" className="mb-1 bg-gray-200 p-2 font-bold text-center">End Date:</label>
                  <input type="date" name="end_date" value={leaveData.end_date} onChange={handleChange} required className="p-2 border rounded" /> {/* Updated input */}
              </div>
  
              <div className="flex flex-col">
                  <label htmlFor="reason" className="mb-1 bg-gray-200 p-2 font-bold text-center">Reason:</label>
                  <textarea name="reason" value={leaveData.reason} onChange={handleChange} required className="p-2 border rounded"></textarea> {/* Updated textarea */}
              </div>
  
              <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200">Submit</button> {/* Updated button */}
          </form>
          {message && <p style={{ color: messageType === 'success' ? 'green' : 'red', marginTop: '20px' }}>{message}</p>} {/* Message display */}
      </div>
  );
}
