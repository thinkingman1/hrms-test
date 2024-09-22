import { createClient } from '@vercel/postgres';

export default async function handler(req, res) {
    const client = createClient();
    await client.connect();

    switch (req.method) {
        case 'GET':
            // Check for a query parameter to differentiate the requests
            const { type } = req.query;

            if (type === 'statuses') {
                // Fetch all leave application statuses
                try {
                    const result = await client.sql`
                        SELECT
                la.id,
                COALESCE(e.firstname || ' ' || e.lastname, 'No Employee Assigned') AS employee_name,
                lt.name AS leave_type,
                la.start_date,
                la.end_date,
                la.reason,
                la.status
            FROM
                leave_applications la
            LEFT JOIN
                employees e ON la.employee_id = e.employeeid
            JOIN
                leave_types lt ON la.leave_type_id = lt.id;
                    `;
                    res.status(200).json(result.rows);
                } catch (error) {
                    console.error('Failed to fetch leave application statuses:', error);
                    res.status(500).json({ error: 'Failed to fetch leave application statuses' });
                } finally {
                    await client.end();
                }
            } else {
                // Fetch leave tracker data (existing functionality)
                try {
                    const result = await client.sql`
                        SELECT
                            l.id,
                            e.firstname || ' ' || e.lastname AS employee_name,
                            lt.name AS leave_type,
                            l.total_leaves,
                            l.used_leaves,
                            l.remaining_leaves
                        FROM
                            leave_tracker l
                        JOIN
                            employees e ON l.employee_id = e.employeeid
                        JOIN
                            leave_types lt ON l.leave_type_id = lt.id;
                    `;
                    res.status(200).json(result.rows);
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Failed to fetch leave tracker data' });
                } finally {
                    await client.end();
                }
            }
            break;
        case 'POST':
            const { employee_id, leave_type_id, start_date, end_date, reason, status } = req.body;
            try {
                const result = await client.sql`
                    INSERT INTO leave_applications (employee_id, leave_type_id, start_date, end_date, reason, status)
                    VALUES (${employee_id}, ${leave_type_id}, TO_DATE(${start_date}, 'YYYY-MM-DD'), TO_DATE(${end_date}, 'YYYY-MM-DD'), ${reason}, ${status})
                `;
                res.status(201).json({ message: 'Leave application added successfully', data: result.rows });
            } catch (error) {
                console.error('SQL Error:', error.message);
                res.status(500).json({ error: 'Failed to add leave application', sqlError: error.message });
            } finally {
                await client.end();
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
