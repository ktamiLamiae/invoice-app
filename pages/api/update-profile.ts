import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db';
import bcrypt from 'bcryptjs';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public/uploads');
    form.keepExtensions = true;
    form.multiples = false; 

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(500).json({ success: false, message: 'File upload error' });
        }

        try {
            console.log("Fields received:", fields);
            
            const id = fields.id?.trim();
            const name = fields.name?.trim();
            const email = fields.email?.trim();
            const password = fields.password;
            const companyId = fields.companyId; 
            console.log(name,email)
            if (!id || !name || !email || !companyId) {
                console.error("Missing fields:", { id, name, email, companyId });
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }

            let imagePath: string | null = null;

            if (files.image) {
                const file = Array.isArray(files.image) ? files.image[0] : files.image;
                if (file && file.filepath) {
                    const newFileName = `user_${id}_${Date.now()}${path.extname(file.originalFilename ?? '')}`;
                    const newPath = path.join(form.uploadDir, newFileName);

                    fs.renameSync(file.filepath, newPath);
                    imagePath = `/uploads/${newFileName}`;
                }
            }

            let query = `UPDATE users SET name = ?, email = ?, compagny_id = ?`;
            const params: any[] = [name, email, companyId];

            if (password && password.length > 0) {
                const hashedPassword = await bcrypt.hash(password, 10);
                query += `, password = ?`;
                params.push(hashedPassword);
            }

            if (imagePath) {
                query += `, image = ?`;
                params.push(imagePath);
            }

            query += ` WHERE id = ?`;
            params.push(id);

            console.log("Executing query:", query, params);
            const [result] = await pool.execute(query, params);

            if (result && (result as any).affectedRows > 0) {
                return res.status(200).json({ success: true, imagePath });
            } else {
                return res.status(404).json({ success: false, message: 'User not found or no changes made' });
            }
        } catch (error: any) {
            return res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    });
}
