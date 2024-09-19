import { createClient } from '@vercel/postgres';

export default async function handler(req, res) {
    const client = createClient(); // Use createClient instead of new Client

    await client.connect();

    try {
        const result = await client.sql`SELECT * FROM Employees`; // Use the sql tagged template
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to fetch data' });
    } finally {
        await client.end();
    }
}