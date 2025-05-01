import express from 'express'
import { getStudentDashboard } from '../Controllers/student.controller.js';

const router = express.Router();

router.post("/student", getStudentDashboard)

export default router 