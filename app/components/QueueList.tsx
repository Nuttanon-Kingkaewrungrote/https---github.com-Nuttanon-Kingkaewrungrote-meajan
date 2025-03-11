'use client'

import React, { useState, useEffect } from 'react'

// กำหนดโครงสร้างข้อมูลคิว
interface QueueItem {
  id: number
  name: string
  tel: string
  type_name: string
  date_name: string
  time_name: string
  qty: number
  card_id: string
  regis_date: string
}

export default function QueueList() {
  const [queueData, setQueueData] = useState<QueueItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchQueueData() {
      try {
        const response = await fetch('/api/queue')
        if (!response.ok) {
          throw new Error('ดึงข้อมูลคิวล้มเหลว')
        }
        const data = await response.json()
        setQueueData(data)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่รู้จัก')
        setIsLoading(false)
      }
    }

    fetchQueueData()
  }, [])

  const deleteQueue = async (id: number) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลคิวนี้?')) {
      try {
        const response = await fetch(`/api/queue/${id}`, {
          method: 'DELETE'
        })
        const data = await response.json()

        if (response.ok) {
          alert(data.message || 'ลบข้อมูลสำเร็จ')
          setQueueData(queueData.filter((item) => item.id !== id)) // ลบข้อมูลจาก UI
        } else {
          alert(data.error || 'เกิดข้อผิดพลาดในการลบ')
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบข้อมูล')
      }
    }
  }

  if (isLoading) return <div className="text-center mt-10 text-lg">กำลังโหลดข้อมูลคิว...</div>
  if (error) return <div className="text-center mt-10 text-lg text-red-500">ข้อผิดพลาด: {error}</div>

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">รายการคิว</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 border">ชื่อ</th>
              <th className="p-4 border">เบอร์โทร</th>
              <th className="p-4 border">ประเภท</th>
              <th className="p-4 border">วันที่</th>
              <th className="p-4 border">เวลา</th>
              <th className="p-4 border">จำนวน</th>
              <th className="p-4 border">รหัสบัตร</th>
              <th className="p-4 border">วันที่ลงทะเบียน</th>
              <th className="p-4 border">การกระทำ</th>
            </tr>
          </thead>
          <tbody>
            {queueData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4 border text-center">{item.name}</td>
                <td className="p-4 border text-center">{item.tel}</td>
                <td className="p-4 border text-center">{item.type_name}</td>
                <td className="p-4 border text-center">{item.date_name}</td>
                <td className="p-4 border text-center">{item.time_name}</td>
                <td className="p-4 border text-center">{item.qty}</td>
                <td className="p-4 border text-center">{item.card_id}</td>
                <td className="p-4 border text-center">{item.regis_date}</td>
                <td className="p-4 border text-center">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => deleteQueue(item.id)}
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
