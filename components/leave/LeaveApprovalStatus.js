import React, { useEffect, useState } from 'react';

const LeaveStatusPage = () => {
    const [leaveStatuses, setLeaveStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaveStatuses = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/leaves?status=all');
                if (!response.ok) {
                    throw new Error(`Failed to fetch leave statuses: ${response.statusText}`);
                }
                const data = await response.json();
                setLeaveStatuses(data);
                console.log(data); // Log data for debug purposes
            } catch (error) {
                console.error('Fetch error:', error);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchLeaveStatuses();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(); // Format date for readability
    };

    if (loading) return <div>Loading, please wait...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="leave-statuses-container">
            <h1 className="text-2xl font-bold mb-4">Leave Statuses</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Employee Name</th>
                        <th className="border border-gray-300 px-4 py-2">Leave Type</th>
                        <th className="border border-gray-300 px-4 py-2">Start Date</th>
                        <th className="border border-gray-300 px-4 py-2">End Date</th>
                        <th className="border border-gray-300 px-4 py-2">Reason</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveStatuses.map(leave => (
                        <tr key={leave.id} className="border-b border-gray-300">
                            <td className="px-4 py-2">{leave.employee_name}</td>
                            <td className="px-4 py-2">{leave.leave_type}</td>
                            <td className="px-4 py-2">{formatDate(leave.start_date)}</td>
                            <td className="px-4 py-2">{formatDate(leave.end_date)}</td>
                            <td className="px-4 py-2">{leave.reason}</td>
                            <td className="px-4 py-2">{leave.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveStatusPage;
