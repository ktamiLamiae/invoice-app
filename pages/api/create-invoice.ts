import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'invoicing_db',
            });

            const { client_id, car_id, amount, advance, memo, date, dueDate, paymentMethod, paidStatus, company_id } = req.body;
            const bodyData = {
                client_id,
                car_id,
                date,
                dueDate,
                amount,
                advance,
                paymentMethod,
                paidStatus,
                memo,
                company_id
            };
            console.log(bodyData);
            const [result] = await connection.execute('INSERT INTO invoices SET ?', bodyData);
            await connection.end();
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            console.error('Error connecting to database:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
