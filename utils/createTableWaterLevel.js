import connection from "../config/db";


const createSensorTable = (sensorName) => {
    const query = `
      CREATE TABLE IF NOT EXISTS \`${sensorName}\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        water_level FLOAT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Gagal membuat tabel: ", err);
        return;
      }
      console.log(`Tabel ${sensorName} berhasil dibuat`);
    });
}
