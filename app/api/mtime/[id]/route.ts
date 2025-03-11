// src/app/api/mtime/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop(); // Get ID from the URL path

  if (!id) {
    return NextResponse.json({ error: 'กรุณากรอก ID ที่ต้องการลบ' }, { status: 400 });
  }

  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    // Execute DELETE query
    const [result] = await connection.execute('DELETE FROM mtime WHERE id = ?', [id]);

    // Check if any rows were deleted
    if ((result as mysql.ResultSetHeader).affectedRows > 0) {
      return NextResponse.json({ message: 'ลบเวลาเรียบร้อยแล้ว' });
    }

    return NextResponse.json({ error: 'ไม่พบเวลาในระบบที่ต้องการลบ' }, { status: 404 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
