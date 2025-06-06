# Lably – Backend

Lably is a lab attendance and assignment management system designed for colleges and universities. This is the backend service built using **Node.js**, **Express**, and **Supabase (PostgreSQL)** for data management.  
The earlier version of this project was handled using **MySQL**, and later migrated to **PostgreSQL** on **Supabase**.  
This backend API handles all the routes that serve the frontend of Lably.  
Deployed on **Render**.

---

## 🛠️ About the Project

This project was created as a **SQL-focused academic project** to showcase the use of:
- **SQL functions** for server-side logic encapsulation.
- **Triggers** to automate backend operations such as updating assignment status or syncing attendance.
- **Relational joins** to fetch combined data efficiently (e.g., student and assignment records).
- Use of **JSON payloads** to pass dynamic data to stored procedures.
- **Supabase PostgreSQL** for leveraging powerful SQL + REST capabilities.

---

## 🔍 Features

- Teacher login and batch management.
- Create and delete lab sessions.
- Mark and fetch student attendance.
- Assignment management and status tracking.
- Student-specific dashboard.

---

## 🧠 SQL Highlights

- `init_lab(input JSON)` function: Initializes a lab session by creating attendance records based on roll number ranges.
- Triggers on assignment or attendance tables: Ensure automatic updates and validations.
- Use of `DISTINCT`, `JOIN`, `GROUP BY` in Supabase queries.
- Backend logic partially delegated to the database to reduce API complexity.

---

## 📦 Tech Stack

- **Backend:** Node.js + Express
- **Database:** PostgreSQL via Supabase
- **ORM/DB Client:** Supabase JS SDK
- **Deployment:** Render (backend), Supabase (hosted DB)

---

## 📇 Table Structure of DB
![Screenshot 2025-06-06 172732](https://github.com/user-attachments/assets/87bd64cd-3a4c-47f4-a003-ffc9f849fa9d)
