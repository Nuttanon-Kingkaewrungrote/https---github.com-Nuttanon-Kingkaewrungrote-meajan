'use client'
// src/app/components/DateList.tsx
import { useEffect, useState } from 'react';

interface DateItem {
  id: number;
  date: string;
  week: number;
}

const DateList = () => {
  const [dates, setDates] = useState<DateItem[]>([]);
  const [newDate, setNewDate] = useState<string>('');
  const [newWeek, setNewWeek] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  // ดึงข้อมูลวันที่ทั้งหมดจาก API
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const res = await fetch('/api/mdate');
        const data = await res.json();

        if (res.ok) {
          setDates(data);
        } else {
          setError(data.error || 'ไม่สามารถดึงข้อมูลวันที่ได้');
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับ API');
      }
    };

    fetchDates();
  }, []);

  // ฟังก์ชันสำหรับเพิ่มวันที่
  const handleAddDate = async () => {
    const res = await fetch('/api/mdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: newDate, week: newWeek }),
    });

    const data = await res.json();
    if (res.ok) {
      setDates([...dates, { id: Date.now(), date: newDate, week: newWeek }]);
      setNewDate('');
      setNewWeek(1);
    } else {
      alert(data.error || 'ไม่สามารถเพิ่มข้อมูลวันที่ได้');
    }
  };

// src/app/components/DateList.tsx
const handleDelete = async (id: number) => {
    const res = await fetch(`/api/mdate/${id}`, {
      method: 'DELETE',
    });
  
    const data = await res.json();
  
    if (res.ok) {
      // ลบจาก state
      setDates(dates.filter((date) => date.id !== id));
    } else {
      alert(data.error || 'ไม่สามารถลบข้อมูลวันที่ได้');
    }
  };


  return (
    <div>
      <h2>รายการวันที่</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {dates.map((dateItem) => (
          <li key={dateItem.id}>
            {dateItem.date} - สัปดาห์ที่ {dateItem.week}{' '}
            <button onClick={() => handleDelete(dateItem.id)}>ลบ</button>
          </li>
        ))}
      </ul>

      <h3>เพิ่มวันที่</h3>
      <input
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
        placeholder="กรุณากรอกวันที่"
      />
      <input
        type="number"
        value={newWeek}
        onChange={(e) => setNewWeek(Number(e.target.value))}
        placeholder="กรุณากรอกสัปดาห์"
      />
      <button onClick={handleAddDate}>เพิ่ม</button>
    </div>
  );
};

export default DateList;
