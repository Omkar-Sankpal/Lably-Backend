// import express from 'express'; 
// import db from './DB/db.js'
// import teacherRoutes from './Routes/teacher.routes.js'
// import studentRoutes from "./Routes/student.routes.js"
// import cors from 'cors'

// const app = express(); 

// app.use(cors({origin: "http://localhost:5173",credentials: true }));
// app.use((req, res, next) => {
//     res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//     res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
//   });

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

// app.listen(5000, () => {
//     console.log("Mini project par kaam chalu haiiiiii !! ");
    
// })


import express from 'express'; 
import db from './DB/db.js';
import teacherRoutes from './Routes/teacher.routes.js';
import studentRoutes from "./Routes/student.routes.js";
import cors from 'cors';

const app = express();

// List of allowed origins (both local and production)
const allowedOrigins = [
  "http://localhost:5173",         // Local development
  "https://lably-fronend.onrender.com"  // Your deployed frontend
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Additional headers
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(express.json()); 
app.use('/api/dmsl_mini', teacherRoutes);
app.use('/api/dmsl-mini/students', studentRoutes);

db.connect(err => {
    if (err) {
      console.error('MySQL connection error:', err);
      return;
    }
    console.log('Connected to MySQL!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

