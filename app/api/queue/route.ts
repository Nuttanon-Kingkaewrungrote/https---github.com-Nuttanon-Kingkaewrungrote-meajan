import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET(request: NextRequest) {
  // เพิ่ม console.log เพื่อตรวจสอบการเชื่อมต่อ
  console.log('Database Config:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
  })

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    })

    try {
      const [rows] = await connection.execute(`
        SELECT 
          a.id, 
          a.name, 
          a.tel, 
          f.type AS type_name, 
          b.date AS date_name, 
          c.time AS time_name, 
          a.qty, 
          a.card_id, 
          a.regis_date
        FROM tque a
        LEFT JOIN mdate b ON b.id = a.date
        LEFT JOIN mtime c ON c.id = a.time
        LEFT JOIN mtype f ON f.id = a.type
        ORDER BY a.regis_date DESC
        LIMIT 100
      `)

      return NextResponse.json(rows)
    } catch (queryError) {
      console.error('Query Error:', queryError)
      return NextResponse.json(
        { 
          error: 'เกิดข้อผิดพลาดในการดึงข้อมูลคิว', 
          details: queryError instanceof Error ? queryError.message : 'ข้อผิดพลาดที่ไม่รู้จัก' 
        }, 
        { status: 500 }
      )
    } finally {
      await connection.end()
    }
  } catch (connectionError) {
    console.error('Connection Error:', connectionError)
    return NextResponse.json(
      { 
        error: 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้', 
        details: connectionError instanceof Error ? connectionError.message : 'ข้อผิดพลาดที่ไม่รู้จัก' 
      }, 
      { status: 500 }
    )
  }
}
