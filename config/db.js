import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

/*
db berfungsi untuk melakukan setup koneksi pool ke database
dengan menggunakan config dari dotenv
*/

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "water_level_monitoring",
  waitForConnections: true, // Menunggu jika semua koneksi sedang digunakan
  connectionLimit: 10, // Maksimum jumlah koneksi dalam pool
  queueLimit: 0, // Tidak ada limit antrian
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error getting connection from pool:", err);
    process.exit(1);
  }

  console.log("Connected to the database");

  // Jangan lupa untuk melepaskan koneksi kembali ke pool setelah selesai menggunakannya
  connection.release();
});

export default pool;
