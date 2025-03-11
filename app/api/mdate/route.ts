// src/app/api/mdate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// ฟังก์ชัน GET สำหรับดึงข้อมูลวันที่ทั้งหมด
export async function GET() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [rows] = await connection.execute('SELECT * FROM mdate');
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

// ฟังก์ชัน POST สำหรับเพิ่มวันที่ใหม่
export async function POST(request: NextRequest) {
  const { date, week } = await request.json();

  if (!date || !week) {
    return NextResponse.json({ error: 'กรุณากรอกวันที่และสัปดาห์' }, { status: 400 });
  }

  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [result] = await connection.execute('INSERT INTO mdate (date, week) VALUES (?, ?)', [date, week]);
    
    if (result) {
      return NextResponse.json({ message: 'เพิ่มวันที่สำเร็จ' });
    }

    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการเพิ่มวันที่' }, { status: 500 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
