import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await pool.getConnection();
    
    try {
      // Check if user exists
      const [existing]: any = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (existing.length > 0) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }

      // Insert user
      const [result]: any = await connection.execute(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );

      // Create default stats
      await connection.execute(
        'INSERT INTO user_stats (user_id) VALUES (?)',
        [result.insertId]
      );

      // Create sample transactions
      const sampleTransactions = [
        ['Apple Store', 'Technology', -999.00, 'expense', 'Completed'],
        ['Starbucks Coffee', 'Food & Drink', -15.50, 'expense', 'Completed'],
        ['Salary Deposit', 'Income', 5000.00, 'income', 'Completed'],
        ['Amazon Prime', 'Subscription', -14.99, 'expense', 'Pending']
      ];

      for (const trans of sampleTransactions) {
        await connection.execute(
          'INSERT INTO transactions (user_id, title, category, amount, type, status) VALUES (?, ?, ?, ?, ?, ?)',
          [result.insertId, ...trans]
        );
      }

      return NextResponse.json({
        message: 'User registered successfully',
        userId: result.insertId
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
