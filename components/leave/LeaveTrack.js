
"use client";

import { useEffect, useState } from 'react';

const LeaveTrack = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await fetch('/api/leaves');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched leaves:', data);  // Log the fetched data
                setLeaves(Array.isArray(data) ? data : [data]); // Ensure it's an array
            } catch (error) {
                console.error('Fetch error:', error);  // Log the error
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaves();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div>
          <h3 className="text-lg font-semibold">Leave Tracker</h3>
          <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                  <tr>
                      <th className="border border-gray-300 px-4 py-2">Employee Name</th>
                      <th className="border border-gray-300 px-4 py-2">Leave Type</th>
                      <th className="border border-gray-300 px-4 py-2">Total Leaves</th>
                      <th className="border border-gray-300 px-4 py-2">Used Leaves</th>
                      <th className="border border-gray-300 px-4 py-2">Remaining Leaves</th>
                  </tr>
              </thead>
              <tbody>
                  {leaves.length > 0 ? (
                      leaves.map(leave => (
                          <tr key={leave.id}>
                              <td className="border border-gray-300 px-4 py-2 text-center">{leave.employee_name}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">{leave.leave_type}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">{leave.total_leaves}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">{leave.used_leaves}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">{leave.remaining_leaves}</td>
                          </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">No leaves found</td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>
  );
};

export default LeaveTrack;
