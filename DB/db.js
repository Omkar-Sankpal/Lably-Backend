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

  
// import mysql from 'mysql2';
// import dotenv from 'dotenv';

// dotenv.config();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST , 
//     port: process.env.DB_PORT , 
//     user: process.env.DB_USER ,
//     password: process.env.DB_PASS, 
//     database: process.env.DB_NAME ,
//     ssl: {
//         rejectUnauthorized: false 
//     }
// });
// console.log('Connecting to:', {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME
// });

// export default db;

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Only use this on the server!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Service Role Key must be set in .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Connected to Supabase:', supabaseUrl);

export default supabase;
