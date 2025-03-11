// /app/api/mtype/route.ts
import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

// ฟังก์ชัน GET สำหรับดึงข้อมูลประเภททั้งหมด
export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    })

    try {
      const [rows] = await connection.execute('SELECT * FROM mtype')
      return NextResponse.json(rows)
    } catch (queryError) {
      console.error('Query Error:', queryError)
      return NextResponse.json(
        { 
          error: 'เกิดข้อผิดพลาดในการดึงข้อมูลประเภท', 
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

// ฟังก์ชัน POST สำหรับเพิ่มข้อมูลประเภท
export async function POST(request: NextRequest) {
  const { type } = await request.json() // รับข้อมูลประเภทจาก body

  if (!type) {
    return NextResponse.json({ error: 'กรุณากรอกประเภท' }, { status: 400 })
  }

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    })

    // เพิ่มข้อมูลประเภทลงในฐานข้อมูล
    const [result] = await connection.execute('INSERT INTO mtype (type) VALUES (?)', [type])
    await connection.end()

    if (result) {
      return NextResponse.json({ message: 'เพิ่มประเภทสำเร็จ' })
    }

    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการเพิ่มประเภท' }, { status: 500 })
  } catch (error) {
    return NextResponse.json({ error: 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้' }, { status: 500 })
  }
}
