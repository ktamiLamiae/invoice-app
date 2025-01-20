import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'invoicing_db',
            });

            const {
                client_id,
                car_id,
                amount,
                advance,
                memo = null,
                date,
                dueDate = null,
                paymentMethod,
                paidStatus,
                compagny_id, 
            } = req.body;

            const paidStatusValue = paidStatus === 'Paid' ? 1 : 0;
            // const companyId = compagny_id ?? null;

            const [result] = await connection.execute(
                'INSERT INTO invoices (client_id, car_id, amount, advance, memo, date, dueDate, paymentMethod, paidStatus, compagny_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [client_id, car_id, amount, advance, memo, date, dueDate, paymentMethod, paidStatusValue, compagny_id]
            );

            await connection.end();
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
