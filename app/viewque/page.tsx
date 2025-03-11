import React from 'react'
import QueueList from '../components/QueueList'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ระบบจัดการคิว</h1>
      <QueueList />
    </div>
  )
}