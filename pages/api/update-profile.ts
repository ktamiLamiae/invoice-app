import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',   
                database: 'invoicing_db',
            });

            const { name, email, password, companyId, id } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const [result] = await connection.execute(
                `UPDATE users SET name = ?, email = ?, compagny_id = ? ${password ? ', password = ?' : ''} WHERE id = ?`,
                [name, email, companyId, ...(hashedPassword ? [hashedPassword] : []), id]
            );            

            await connection.end();

            if (result && result.affectedRows > 0) {
                res.status(200).json({ success: true });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        } catch (error) {
            console.error('Error connecting to database:', error);
            res.status(500).json({ success: false,  error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
