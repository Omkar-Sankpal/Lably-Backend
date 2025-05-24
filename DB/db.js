// import mysql from 'mysql2'
// import dotenv from 'dotenv'

// dotenv.config(); 

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: process.env.DB_PASS, // change this
//     database: '23315_mini'
// });

// export default db ;

  
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'tramway.proxy.rlwy.net', 
    port: process.env.DB_PORT || 26140, 
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'zrXlcWASefxamoEooptFgIAbnQIBcJfd', 
    database: process.env.DB_NAME || 'railway',
    ssl: {
        rejectUnauthorized: false 
    }
});
console.log('Connecting to:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});

export default db;