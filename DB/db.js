import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config(); 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS, // change this
    database: '23315_mini'
});

export default db ;

  