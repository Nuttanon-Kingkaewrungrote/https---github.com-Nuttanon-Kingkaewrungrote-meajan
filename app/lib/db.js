import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost', // ตรวจสอบว่า host ของฐานข้อมูลถูกต้อง
  user: 'root', // ตรวจสอบว่า username ถูกต้อง
  password: '', // ตรวจสอบว่า password ถูกต้อง
  database: 'que', // ตรวจสอบว่า database ชื่อถูกต้อง
});

export default connection;