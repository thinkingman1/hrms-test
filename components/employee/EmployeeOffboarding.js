import React, { useState } from 'react';

const EmployeeOffboarding = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchEmployeeDetails = async () => {
    try {
      const response = await fetch(`/api/employees?search=${searchTerm}`); // This will call the GET method
      const data = await response.json();
      setEmployeeDetails(data.length > 0 ? data[0] : null); // Assuming the API returns an array
      setMessage(data.length > 0 ? '' : 'No employee found');
    } catch (error) {
      setMessage('Error fetching employee details');
    }
  };

  const offboardEmployee = async (id) => {
    try {
      const response = await fetch(`/api/employees?id=${id}`, { method: 'DELETE' }); // Ensure DELETE method is handled in your API
      if (response.ok) {
        setEmployeeDetails(null);
        setMessage(`Employee with ID ${id} has been offboarded.`);
      } else {
        setMessage('Error offboarding employee');
      }
    } catch (error) {
      setMessage('Error offboarding employee');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Employee Offboarding</h3>
      <div className="flex flex-col">
        <label htmlFor="search" className="mb-1">Search (ID, First Name, Last Name):</label>
        <input 
          type="text" 
          id="search" 
          value={searchTerm} 
          onChange={handleSearch} 
          required 
          className="p-2 border rounded"
        />
        <button onClick={fetchEmployeeDetails} className="mt-2 p-2 bg-green-500 text-white rounded">Submit</button>
        
        {employeeDetails && (
          <div className="mt-4">
            <h4>Employee Details:</h4>
            <p>ID: {employeeDetails.employeeid}</p> {/* Adjusted to match your database field */}
            <p>First Name: {employeeDetails.firstname}</p> {/* Adjusted to match your database field */}
            <p>Last Name: {employeeDetails.lastname}</p> {/* Adjusted to match your database field */}
            <button onClick={() => offboardEmployee(employeeDetails.employeeid)} className="mt-2 p-2 bg-red-500 text-white rounded">Offboard</button>
          </div>
        )}
        <p className="text-green-500">{message}</p>
      </div>
    </div>
  );
};

export default EmployeeOffboarding;