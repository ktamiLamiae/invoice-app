import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const {
            client_id, car_id, amount, advance, memo = null,
            date, dueDate = null, paymentMethod, paidStatus, compagny_id
        } = req.body;

        const paidStatusValue = paidStatus === 'Paid' ? 1 : 0;

        const [result] = await pool.execute(
            `INSERT INTO invoices (client_id, car_id, amount, advance, memo, date, dueDate, paymentMethod, paidStatus, compagny_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [client_id, car_id, amount, advance, memo, date, dueDate, paymentMethod, paidStatusValue, compagny_id]
        );

        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}
