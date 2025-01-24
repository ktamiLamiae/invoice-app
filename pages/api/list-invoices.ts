import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'invoicing_db',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;
            const offset = (page - 1) * limit;
            //  CASE 
            //             WHEN cl.isCompany = 1 THEN cl.companyName 
            //             ELSE CONCAT(cl.surname, ' ', cl.firstname) 
            //         END AS client_name, 
            const query = `
                SELECT 
                    inv.*, 
                    cars.*,
                    cl.*
                FROM invoices AS inv
                JOIN clients AS cl ON cl.id = inv.client_id
                JOIN cars ON cars.id = inv.car_id
            `;

            const [invoices] = await pool.execute(query, [limit, offset]);
            res.status(200).json({ success: true, data: invoices });
        } catch (error) {
            console.error('Error querying database:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}