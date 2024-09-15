import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

/*
db berfungsi untuk melakukan setup koneksi ke database
terhubung dengan config dotenv
*/

const connection = mysql.createConnection({
  // host: "api.fmews.wefgis-snyc.com",
  // user: "fmews",
  // password: "fwPV8vNU94ZrE8VcOkKe",
  // database: "db-fmews",
  host: "localhost",
  user: "root",
  password: "root",
  database: "water_level_monitoring",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log("Connected to the database");
});

export default connection;
