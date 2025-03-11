import { NextResponse } from 'next/server';
import connection from '../../lib/db';

// ประเภทของ `err` จะเป็น `Error` หรือ `null`
export async function GET() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM tque', (err: Error | null, rows: any[]) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(NextResponse.json(rows));
    });
  });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();  // รอข้อมูล ID ที่จะลบจาก Body ของคำขอลบ
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM tque WHERE id = ?', [id], (err: Error | null, result: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(NextResponse.json({ success: true, message: 'Deleted successfully' }));
    });
  });
}
