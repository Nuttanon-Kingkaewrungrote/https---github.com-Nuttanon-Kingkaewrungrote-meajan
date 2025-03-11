'use client'

import { useEffect, useState } from 'react';

interface TimeItem {
  id: number;
  time: string;
}

const TimeList = () => {
  const [times, setTimes] = useState<TimeItem[]>([]);
  const [newTime, setNewTime] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Fetch mtime records from the API
  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const res = await fetch('/api/mtime');
        const data = await res.json();

        if (res.ok) {
          setTimes(data);
        } else {
          setError(data.error || 'ไม่สามารถดึงข้อมูลเวลาได้');
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับ API');
      }
    };

    fetchTimes();
  }, []);

  // Handle adding a new mtime record
  const handleAddTime = async () => {
    const res = await fetch('/api/mtime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ time: newTime }),
    });

    const data = await res.json();
    if (res.ok) {
      setTimes([...times, { id: Date.now(), time: newTime }]);
      setNewTime('');
    } else {
      alert(data.error || 'ไม่สามารถเพิ่มข้อมูลเวลาได้');
    }
  };

  // Handle deleting an mtime record
  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/mtime/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (res.ok) {
      setTimes(times.filter((time) => time.id !== id));
    } else {
      alert(data.error || 'ไม่สามารถลบข้อมูลเวลาได้');
    }
  };

  return (
    <div>
      <h2>รายการเวลา</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      {/* List of times */}
      <ul>
        {times.map((timeItem) => (
          <li key={timeItem.id}>
            {timeItem.time}{' '}
            <button onClick={() => handleDelete(timeItem.id)}>ลบ</button>
          </li>
        ))}
      </ul>

      {/* Form to add a new time */}
      <h3>เพิ่มเวลา</h3>
      <input
        type="time"
        value={newTime}
        onChange={(e) => setNewTime(e.target.value)}
        placeholder="กรุณากรอกเวลา"
      />
      <button onClick={handleAddTime}>เพิ่ม</button>
    </div>
  );
};

export default TimeList;
