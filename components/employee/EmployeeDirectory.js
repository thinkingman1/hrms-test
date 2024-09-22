"use client"; // Mark the component as a Client Component

import { useEffect, useState } from 'react';

const EmployeeDirectory = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('/api/employees');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h3 className="text-lg font-semibold">Employee Directory</h3>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Employee ID</th>
                        <th className="border border-gray-300 px-4 py-2">First Name</th>
                        <th className="border border-gray-300 px-4 py-2">Last Name</th>
                        <th className="border border-gray-300 px-4 py-2">Position</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Hire Date</th>
                        <th className="border border-gray-300 px-4 py-2">Department ID</th>
                        <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.employeeid}>
                            <td className="border border-gray-300 px-4 py-2">{employee.employeeid}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.firstname}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.lastname}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.position}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.hiredate}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.departmentid}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.phonenumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeDirectory;