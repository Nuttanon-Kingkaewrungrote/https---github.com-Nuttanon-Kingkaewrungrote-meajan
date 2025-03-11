'use client'

import React, { useState, useEffect } from 'react'

export default function MTypeList() {
  const [mtypes, setMtypes] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  // ดึงข้อมูลประเภททั้งหมดจาก API
  useEffect(() => {
    async function fetchMTypes() {
      try {
        const response = await fetch('/api/mtype')
        const data = await response.json()

        if (response.ok) {
          setMtypes(data)
        } else {
          setError(data.error || 'เกิดข้อผิดพลาดในการดึงข้อมูลประเภท')
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการเชื่อมต่อ API')
      }
    }

    fetchMTypes()
  }, [])

  const handleDelete = async (id: number) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบประเภทนี้?')) {
      try {
        const response = await fetch(`/api/mtype/${id}`, {
          method: 'DELETE'
        })
        const data = await response.json()

        if (response.ok) {
          setMessage(data.message || 'ลบประเภทสำเร็จ')
          setMtypes(mtypes.filter((item) => item.id !== id)) // ลบจาก UI
        } else {
          setError(data.error || 'เกิดข้อผิดพลาดในการลบประเภท')
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการลบประเภท')
      }
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">รายการประเภทใบอนุญาต</h2>

      {message && <div className="text-green-500 mb-4">{message}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 border">ประเภท</th>
              <th className="p-4 border">การกระทำ</th>
            </tr>
          </thead>
          <tbody>
            {mtypes.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4 border">{item.type}</td>
                <td className="p-4 border text-center">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(item.id)}
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
