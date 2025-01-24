import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;

        try {
          const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'invoicing_db',
          });
          const [rows]: any = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
          );

          if (rows.length === 0) {
            throw new Error('User not found');
          }

          const user = rows[0];
          const isPasswordCorrect = await bcrypt.compare(password, user.password);
          if (!isPasswordCorrect) {
            throw new Error('Invalid credentials');
          }

          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
          console.error('Authorization failed:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  pages: {
    signIn: '/login', 
  },
});
