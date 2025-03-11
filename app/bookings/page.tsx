// src/app/bookings/page.tsx

'use client'; // เพื่อบอกให้ Next.js รู้ว่าเป็น client component

import { useEffect, useState } from 'react';

// สร้าง type สำหรับข้อมูลการจอง
type Booking = {
  id: number;
  date: number;
  time: number;
  type: number;
  name: string;
  tel: string;
  qty: number;
  card_id: string;
  regis_date: string;
};

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        // ตรวจสอบว่าได้รับข้อมูลในรูปแบบ JSON
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Booking[] = await response.json();
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Bookings List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Quantity</th>
            <th>Card ID</th>
            <th>Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.type}</td>
              <td>{booking.name}</td>
              <td>{booking.tel}</td>
              <td>{booking.qty}</td>
              <td>{booking.card_id}</td>
              <td>{booking.regis_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsPage;
