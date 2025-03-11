import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// ฟังก์ชัน DELETE สำหรับลบวันที่ตาม ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'กรุณาระบุ ID ของวันที่ที่จะลบ' }, { status: 400 });
  }

  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    // ลบข้อมูลจากตาราง mdate โดยใช้ ID ที่ได้จาก params
    const [result] = await connection.execute('DELETE FROM mdate WHERE id = ?', [id]);

    // result[0] คือ ResultSetHeader ที่มี affectedRows
    const affectedRows = (result as mysql.ResultSetHeader).affectedRows;

    if (affectedRows > 0) {
      return NextResponse.json({ message: 'ลบวันที่สำเร็จ' });
    }

    return NextResponse.json({ error: 'ไม่พบวันที่ที่ต้องการลบ' }, { status: 404 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
