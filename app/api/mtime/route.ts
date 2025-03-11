// src/app/api/mtime/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// ฟังก์ชัน GET สำหรับดึงข้อมูลทั้งหมดจาก mtime
export async function GET() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [rows] = await connection.execute('SELECT * FROM mtime ORDER BY time');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'ไม่สามารถดึงข้อมูลได้' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// ฟังก์ชัน POST สำหรับเพิ่มข้อมูลใหม่
export async function POST(request: NextRequest) {
  const { time } = await request.json();

  if (!time) {
    return NextResponse.json({ error: 'กรุณากรอกเวลา' }, { status: 400 });
  }

  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [result] = await connection.execute('INSERT INTO mtime (time) VALUES (?)', [time]);

    if (result) {
      return NextResponse.json({ message: 'เพิ่มเวลาเรียบร้อยแล้ว' });
    }

    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการเพิ่มเวลา' }, { status: 500 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
