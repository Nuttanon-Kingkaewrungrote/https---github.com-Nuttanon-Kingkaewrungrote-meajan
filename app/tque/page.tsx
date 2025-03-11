'use client';

import { useState, useEffect } from 'react';

const TquePage = () => {
  const [tques, setTques] = useState<any[]>([]); // ใช้ any[] ถ้าไม่ทราบประเภทของข้อมูลที่คืนมา
  const [loading, setLoading] = useState<boolean>(true); // สถานะการโหลดข้อมูล
  const [error, setError] = useState<string | null>(null); // ข้อความแสดงข้อผิดพลาดหากมี

  // ฟังก์ชันสำหรับดึงข้อมูลจาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/tque');
        const data = await response.json();
        setTques(data); // ตั้งค่า tques ด้วยข้อมูลที่ได้จาก API
        setLoading(false); // เปลี่ยนสถานะการโหลด
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูล'); // แสดงข้อผิดพลาดหากเกิดข้อผิดพลาด
        setLoading(false); // เปลี่ยนสถานะการโหลด
      }
    };

    fetchData();
  }, []);

  // ฟังก์ชันสำหรับลบข้อมูลจาก API
  const deleteTque = async (id: number) => {
    try {
      const res = await fetch('/api/tque', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // ส่ง id ของข้อมูลที่ต้องการลบ
      });

      const data = await res.json();
      if (data.success) {
        // ลบข้อมูลจาก tques ที่แสดงในหน้า
        setTques(tques.filter((tque: any) => tque.id !== id));
      } else {
        alert('ไม่สามารถลบข้อมูลได้');
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการลบข้อมูล');
    }
  };

  if (loading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>ข้อมูลการจองคิว</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Name</th>
            <th>Tel</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tques.map((tque: any) => (
            <tr key={tque.id}>
              <td>{tque.id}</td>
              <td>{tque.date}</td>
              <td>{tque.time}</td>
              <td>{tque.name}</td>
              <td>{tque.tel}</td>
              <td>
                <button onClick={() => deleteTque(tque.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TquePage;
