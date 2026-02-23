import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

export async function POST(request: Request) {
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

    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    
    try {
      // Save user message
      await connection.execute(
        'INSERT INTO chat_messages (user_id, message, role) VALUES (?, ?, ?)',
        [decoded.userId, message, 'user']
      );

      // Call Hugging Face API
      const response = await fetch(
        'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: message,
            parameters: {
              max_length: 100,
              temperature: 0.7
            }
          }),
        }
      );

      let aiResponse = 'Sorry, I could not process your request.';

      if (response.ok) {
        const data = await response.json();
        if (data && data[0] && data[0].generated_text) {
          aiResponse = data[0].generated_text;
        }
      }

      // Save AI response
      await connection.execute(
        'INSERT INTO chat_messages (user_id, message, role) VALUES (?, ?, ?)',
        [decoded.userId, aiResponse, 'assistant']
      );

      return NextResponse.json({ response: aiResponse });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
      const [messages]: any = await connection.execute(
        'SELECT * FROM chat_messages WHERE user_id = ? ORDER BY created_at ASC LIMIT 50',
        [decoded.userId]
      );

      return NextResponse.json({ messages });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Chat fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
