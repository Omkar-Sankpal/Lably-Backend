// import express from 'express'; 
// import db from './DB/db.js';
// import teacherRoutes from './Routes/teacher.routes.js';
// import studentRoutes from "./Routes/student.routes.js";
// import cors from 'cors';

// const app = express();

// const allowedOrigins = [
//   "http://localhost:5173",        
//   "https://lably-fronend.onrender.com"  
// ];


// app.use(cors({
//   origin: function (origin, callback) {

//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = `The CORS policy for this site does not allow access from ${origin}`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true
// }));

// // Additional headers
// app.use((req, res, next) => {
//     res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//     res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
// });

// app.use(express.json()); 
// app.use('/api/dmsl_mini', teacherRoutes);
// app.use('/api/dmsl-mini/students', studentRoutes);

// db.connect(err => {
//     if (err) {
//       console.error('MySQL connection error:', err);
//       return;
//     }
//     console.log('Connected to MySQL!');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


// import express from 'express'; 
// import db from './DB/db.js';
// import teacherRoutes from './Routes/teacher.routes.js';
// import studentRoutes from "./Routes/student.routes.js";
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Configure __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// const allowedOrigins = [
//   "http://localhost:5173",        
//   "https://lably-fronend.onrender.com",
//   "https://lably-backend.onrender.com"  
// ];

// // CORS Configuration
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = `The CORS policy for this site does not allow access from ${origin}`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true
// }));

// // Security Headers
// app.use((req, res, next) => {
//     res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//     res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
// });

// // API Routes
// app.use(express.json()); 
// app.use('/api/dmsl_mini', teacherRoutes);
// app.use('/api/dmsl-mini/students', studentRoutes);

// // Serve static files from frontend build (if applicable)
// app.use(express.static(path.join(__dirname, '../dist')));


// // Database Connection
// db.connect(err => {
//     if (err) {
//       console.error('MySQL connection error:', err);
//       return;
//     }
//     console.log('Connected to MySQL!');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import teacherRoutes from './Routes/teacher.routes.js';
import studentRoutes from "./Routes/student.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const allowedOrigins = [
  "http://localhost:5173",        
  "https://lably-fronend.onrender.com",
  "https://lably-backend.onrender.com"  
];

// CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(`CORS blocked: ${origin}`), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Security Headers
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Body parser
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // For backend use only!
export const supabase = createClient(supabaseUrl, supabaseKey);

// Routes
app.use('/api/dmsl_mini', teacherRoutes);
app.use('/api/dmsl-mini/students', studentRoutes);

// Serve static frontend build
app.use(express.static(path.join(__dirname, '../dist')));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
