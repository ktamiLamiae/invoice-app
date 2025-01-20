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
            const [users] = await pool.execute(`
                SELECT users.*, settings.company_name As company_name
                FROM users 
                LEFT JOIN settings ON users.compagny_id = settings.id 
                WHERE users.id = 2
            `);
            
            const [companies] = await pool.execute('SELECT id, company_name FROM settings');
            
            res.status(200).json({
                success: true,
                data: {
                    user: users[0], 
                    companies: companies, 
                }
            });
        } catch (error) {
            console.error('Error connecting to database:', error);
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
