
import { createClient } from '@vercel/postgres';

export default async function handler(req, res) {
    const client = createClient(); // Use createClient instead of new Client
    await client.connect();

    if (req.method === 'POST') {
        const { employeeid, firstname, lastname, position, email, hiredate, departmentid, phonenumber } = req.body;

        try {
            await client.sql`
                INSERT INTO Employees (EmployeeID, FirstName, LastName, Position, Email, HireDate, DepartmentID, PhoneNumber)
                VALUES (${employeeid}, ${firstname}, ${lastname}, ${position}, ${email}, ${hiredate}, ${departmentid}, ${phonenumber})
            `;
            res.status(201).json({ message: 'Employee added successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to add employee' });
        } finally {
            await client.end();
        }
    } else if (req.method === 'GET') {
        const { search } = req.query; // Get the search term from the query parameters

        try {
            let result;
            if (search) {
                // If search term exists, filter results
                result = await client.sql`
                    SELECT * FROM Employees
                    WHERE 
                        EmployeeID::text ILIKE ${`%${search}%`} OR
                        FirstName ILIKE ${`%${search}%`} OR
                        LastName ILIKE ${`%${search}%`}
                `;
            } else {
                // If no search term, return all employees
                result = await client.sql`
                    SELECT * FROM Employees
                `;
            }
            res.status(200).json(result.rows);
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ error: 'Failed to fetch data' });
        } finally {
            await client.end();
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query; // Get the employee ID from the query parameters

        try {
            await client.sql`DELETE FROM Employees WHERE EmployeeID = ${id}`; // Delete the employee by ID
            res.status(204).end(); // No content to send back
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete employee' });
        } finally {
            await client.end();
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
