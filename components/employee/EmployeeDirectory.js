import { useEffect, useState } from 'react';

const EmployeeDirectory = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('/api/employees');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Log the fetched data
                setEmployees(data);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchEmployees();
    }, []);

    if (loading) return <p>Loading...</p>; // Show loading state
    if (error) return <p>Error: {error}</p>; // Show error message

    return (
        <div>
            <h3 className="text-lg font-semibold">Employee Directory</h3>
            <ul>
                {employees.map(employee => (
                    <li key={employee.employeeid}>
                        {employee.firstname} {employee.lastname} - {employee.position}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeDirectory;