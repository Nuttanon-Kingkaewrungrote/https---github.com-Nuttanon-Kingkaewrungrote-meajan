'use client'

import { useEffect, useState } from 'react';

interface ScheduleItem {
  id: number;
  date: string;
  time: string;
  qty: number;
  remain: number;
}

const ScheduleList = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch schedule data
    const fetchSchedule = async () => {
      try {
        const res = await fetch('/api/schedule'); // ดึงข้อมูล schedule ทั้งหมด
        const data = await res.json();
        if (res.ok) {
          setSchedules(data);
        } else {
          setError(data.error || 'ไม่สามารถดึงข้อมูล schedule ได้');
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับ API');
      }
    };

    fetchSchedule();
  }, []);

  // Handle delete action
  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/schedule/${id}`, {
      method: 'DELETE', // ส่งคำขอลบข้อมูลที่ `id` นี้
    });

    const data = await res.json();
    if (res.ok) {
      setSchedules(schedules.filter((schedule) => schedule.id !== id)); // ลบจาก state หลังการลบในฐานข้อมูล
    } else {
      alert(data.error || 'ไม่สามารถลบข้อมูลได้');
    }
  };

  return (
    <div>
      <h3>รายการ schedule</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>วันที่</th>
            <th>เวลา</th>
            <th>จำนวน</th>
            <th>คงเหลือ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={schedule.id}>
              <td>{index + 1}</td>
              <td>{schedule.date}</td>
              <td>{schedule.time}</td>
              <td>{schedule.qty}</td>
              <td>{schedule.remain}</td>
              <td>
                <button onClick={() => handleDelete(schedule.id)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleList;
