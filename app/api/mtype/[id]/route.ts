// /app/api/mtype/route.ts
import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

// เพิ่มฟังก์ชัน DELETE สำหรับลบประเภท
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    })

    try {
      // ลบประเภทตาม ID
      const [result] = await connection.execute(`
        DELETE FROM mtype WHERE id = ?
      `, [id])

      const { affectedRows } = result as mysql.ResultSetHeader

      if (affectedRows === 0) {
        return NextResponse.json(
          { error: 'ไม่พบประเภทที่ต้องการลบ' },
          { status: 404 }
        )
      }

      return NextResponse.json({ message: 'ลบประเภทสำเร็จ' })
    } catch (queryError) {
      console.error('Query Error:', queryError)
      return NextResponse.json(
        { 
          error: 'เกิดข้อผิดพลาดในการลบประเภท', 
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
