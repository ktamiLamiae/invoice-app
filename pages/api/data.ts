import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'invoicing_db',
            });

            const [clients] = await connection.execute('SELECT * FROM clients');
            const [cars] = await connection.execute('SELECT * FROM cars');

            console.log('Clients:', clients);
            console.log('Cars:', cars);

            await connection.end();

            res.status(200).json({ success: true, data: { clients, cars } });
        } catch (error) {
            console.error('Error connecting to database:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
