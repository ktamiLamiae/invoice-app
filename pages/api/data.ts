import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const [clients] = await pool.execute('SELECT * FROM clients');
        const [cars] = await pool.execute('SELECT * FROM cars');

        res.status(200).json({ success: true, data: { clients, cars } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}
