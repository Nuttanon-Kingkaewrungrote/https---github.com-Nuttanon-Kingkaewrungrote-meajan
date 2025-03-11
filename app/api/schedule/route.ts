import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// ฟังก์ชัน GET สำหรับดึงข้อมูลจาก setdate
export async function GET() {
  let connection;

  try {
    // เชื่อมต่อฐานข้อมูล
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // ดึงข้อมูลจาก setdate
    const [rows] = await connection.execute('SELECT * FROM setdate ORDER BY date DESC, time DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้', }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
