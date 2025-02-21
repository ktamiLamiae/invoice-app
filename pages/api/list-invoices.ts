import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        const offset = (page - 1) * limit;

        const query = `
            SELECT 
                inv.*, 
                cars.*, 
                cl.*
            FROM invoices AS inv
            JOIN clients AS cl ON cl.id = inv.client_id
            JOIN cars ON cars.id = inv.car_id
            LIMIT ? OFFSET ?`;

        const [invoices] = await pool.execute(query, [limit, offset]);

        res.status(200).json({ success: true, data: invoices });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });   
    }
}
