import express from 'express'
import { addLabSession, deleteLabSession, get_Lab_Sessions, getAllAss, getAllAssignments, getAllStudents, getAssStudents, getBatchStudents, getStudents_Attendance, getTeacher, getUt, insertAssignment, termWork1, tw2, tw3, updateAttendance, updateStudent, updateUT } from '../Controllers/teacher.controller.js';

const router = express.Router();

router.get("/get-all-students", getAllStudents);
router.get("/get-all-assignments", getAllAssignments);
router.post("/get-batch-students", getBatchStudents);
router.post("/get-teacher", getTeacher); 
router.post("/get-ass-students", getAssStudents); 
router.post("/get-ass", getAllAss);
router.post("/update-assignment", updateStudent);
router.post("/insert-assignment", insertAssignment)
router.post("/createlab", addLabSession)
router.post("/get-lab-sessions", get_Lab_Sessions);
router.post("/delete-lab-session", deleteLabSession)
router.post("/get-students-attendance", getStudents_Attendance)
router.post("/update-attendance",updateAttendance)
router.post("/update-ut-marks", updateUT)
router.post("/get-ut-details", getUt)
router.post("/tw1", termWork1 )
router.post("/tw2", tw2 );
router.post("/tw3", tw3 )


export default router 