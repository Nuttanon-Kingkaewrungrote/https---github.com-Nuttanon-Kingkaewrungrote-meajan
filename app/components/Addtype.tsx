// /app/components/AddMType.tsx
'use client'

import React, { useState } from 'react'

export default function AddMType() {
  const [type, setType] = useState<string>('')
  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!type) {
      setError('กรุณากรอกประเภท')
      return
    }

    setIsSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch('/api/mtype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message || 'เพิ่มประเภทสำเร็จ')
        setType('') // ล้างข้อมูลในฟอร์ม
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการเพิ่มประเภท')
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ API')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">เพิ่มประเภทใบอนุญาต</h2>

      {message && <div className="text-green-500 mb-4">{message}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="type" className="block text-lg">ประเภทใบอนุญาต</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-2 p-2 w-full border rounded-lg"
            placeholder="กรอกประเภทใบอนุญาต"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isSubmitting ? 'กำลังส่งข้อมูล...' : 'เพิ่มประเภท'}
        </button>
      </form>
    </div>
  )
}
