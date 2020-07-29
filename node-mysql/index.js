const express = require('express');
const mysql = require('mysql');

const PORT = process.env.PORT || 5000;
const DB_CONFIG = {
  host: 'localhost',
  user: 'behzad',
  password: '123456',
  database: 'test'
};
const db = mysql.createConnection(DB_CONFIG);
db.connect((error) => {
  if (error) {
    throw error;
  }
  console.log(`connect to mysql: host:${DB_CONFIG.host}, username:${DB_CONFIG.username}, password:${DB_CONFIG.password}, database:${DB_CONFIG.database}`);
});



const app = express();

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});
app.listen(PORT, () => console.log(`server is running on prot:${PORT}`));


