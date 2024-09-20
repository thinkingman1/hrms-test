"use client"; // Mark the component as a Client Component

import { useEffect, useState } from 'react';

const EmployeeOnboarding = () => {
  const [newEmployee, setNewEmployee] = useState({
    employeeid: '',
    firstname: '',
    lastname: '',
    position: '',
    email: '',
    hiredate: '',
    departmentid: '',
    phonenumber: ''
  });

  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (event) => {
    setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/employees',  
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
      });

      if (response.ok)  
      {
        setSubmitMessage('Employee successfully added!');
        setNewEmployee({
          employeeid: '',
          firstname: '',
          lastname: '',
          position: '',
          email: '',
          hiredate: '',
          departmentid: '',
          phonenumber: ''
        });
      } else {
        throw new Error('Failed to add employee');
      }
    } catch (error) {
      setSubmitMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Onboard New Employee</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="employeeid" className="mb-1">Employee ID:</label>
          <input 
            type="text" 
            id="employeeid" 
            name="employeeid" 
            value={newEmployee.employeeid} 
            onChange={handleChange} 
            required 
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstname" className="mb-1">First Name:</label>
          <input 
            type="text" 
            id="firstname" 
            name="firstname" 
            value={newEmployee.firstname} 
            onChange={handleChange} 
            required 
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastname" className="mb-1">Last Name:</label>
          <input 
            type="text" 
            id="lastname" 
            name="lastname" 
            value={newEmployee.lastname} 
            onChange={handleChange} 
            required 
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="position" className="mb-1">Position:</label>
          <input 
            type="text" 
            id="position" 
            name="position" 
            value={newEmployee.position} 
            onChange={handleChange} 
            required 
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={newEmployee.email} 
            onChange={handleChange} 
            required 
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="hiredate" className="mb-1">Hire Date:</label>
          <input 
            type="date" 
            id="hiredate" 
            name="hiredate" 
            value={newEmployee.hiredate} 
            onChange={handleChange} 
            required 
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="departmentid" className="mb-1">Department ID:</label>
          <input 
            type="text" 
            id="departmentid" 
            name="departmentid" 
            value={newEmployee.departmentid} 
            onChange={handleChange} 
            required 
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phonenumber" className="mb-1">Phone Number:</label>
          <input 
            type="tel" 
            id="phonenumber" 
            name="phonenumber" 
            value={newEmployee.phonenumber} 
            onChange={handleChange} 
            required 
            className="p-2 border rounded"
          />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200">Submit</button>
        {submitMessage && <p className="mt-4 text-green-500">{submitMessage}</p>}
      </form>
    </div>
  );
};

export default EmployeeOnboarding;