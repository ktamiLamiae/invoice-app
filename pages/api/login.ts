import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'invoicing_db',
      });

      console.log('Database connection established');

      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
      );
      console.log('Database query result:', rows);
      await connection.end();

      if (rows.length > 0) {
        res.status(200).json({ success: true, user: rows[0] });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
