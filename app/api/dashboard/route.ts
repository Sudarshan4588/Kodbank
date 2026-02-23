import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = jwt.verify(
      token.value,
      process.env.NEXTAUTH_SECRET || 'your-secret-key'
    );

    const connection = await pool.getConnection();
    
    try {
      // Get user
      const [users]: any = await connection.execute(
        'SELECT id, name, email FROM users WHERE id = ?',
        [decoded.userId]
      );

      if (users.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Get stats
      const [stats]: any = await connection.execute(
        'SELECT * FROM user_stats WHERE user_id = ?',
        [decoded.userId]
      );

      // Get transactions
      const [transactions]: any = await connection.execute(
        'SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC LIMIT 10',
        [decoded.userId]
      );

      return NextResponse.json({
        user: users[0],
        stats: stats[0] || {},
        transactions
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
