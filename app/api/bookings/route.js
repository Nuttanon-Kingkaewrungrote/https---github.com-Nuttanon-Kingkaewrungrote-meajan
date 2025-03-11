// src/app/api/bookings/route.js
import { query } from '../../lib/db';

export async function GET(req) {
  try {
    const sql = `
      SELECT * FROM tque;  // ดึงข้อมูลทั้งหมดจากตาราง tque
    `;
    const bookings = await query(sql);
    
    // ตรวจสอบว่าเราดึงข้อมูลได้ไหม
    if (bookings && bookings.length > 0) {
      return new Response(JSON.stringify(bookings), { status: 200 });  // ส่งกลับข้อมูลในรูปแบบ JSON
    } else {
      return new Response(JSON.stringify({ message: 'No data found' }), { status: 404 });  // ถ้าไม่มีข้อมูล
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return new Response(JSON.stringify({ error: 'Error fetching data from the database' }), { status: 500 });  // ส่งข้อความข้อผิดพลาดในรูปแบบ JSON
  }
}
