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
        try {
            const result = await client.sql`SELECT * FROM Employees`; // Use the sql tagged template
            res.status(200).json(result.rows);
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ error: 'Failed to fetch data' });
        } finally {
            await client.end();
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}