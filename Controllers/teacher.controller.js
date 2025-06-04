// import db from '../DB/db.js'

// export const getAllStudents = (req, res) => {
//     db.query('SELECT * FROM students', (err, results) => {
//         if (err) {
//           res.status(500).send(err);
//         } else {
//           res.json(results);
//         }
//       });
// }   

// export const getBatchStudents = (req, res) => {
//     const { batch } = req.body;

//     const query = 'SELECT * FROM students WHERE batch = ?';

//     db.query(query, [batch], (err, results) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(results);
//         }
//     });
// };

// GET all students
import supabase from '../DB/db.js';

export const getAllStudents = async (req, res) => {
  const { data, error } = await supabase
    .from('students')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// GET students by batch
export const getBatchStudents = async (req, res) => {
  const { batch } = req.body;

  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('batch', batch);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// export const getAllAssignments = (req, res) => {
//     db.query('SELECT * FROM assignment', (err, results) => {
//         if (err) {
//           res.status(500).send(err);
//         } else {
//           res.json(results);
//         }
//       });
// }

// export const getTeacher = (req, res) => {
//     const { teacherId, password } = req.body;
  
//     const query = 'SELECT * FROM teachers NATURAL JOIN batch_details WHERE t_id = ?';
  
//     db.query(query, [teacherId], (err, results) => {
//       if (err) {
//         res.status(500).send(err);
//       } else if (results.length === 0) {
//         res.status(404).json({ message: 'Teacher not found' });
//       } else {
//         const teacher = results;
  
//         if (teacher[0].password === password) {
//           res.status(200).json(teacher);
//         } else {
//           res.status(401).json({ message: 'Incorrect password' });
//         }
//       }
//     });
//   };
  

// export const getAssStudents = (req, res) => {
//     const {batch , a_id} = req.body; 

//     const query = "select * from student_assignments natural join students where a_id = ? and batch = ?" 

//     db.query(query, [a_id, batch], (err, results) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(results);
//         }
//     });

// }

// export const getAllAss = (req, res) => {
//     const { subject } = req.body; 

//     const query = " select * from assignment where subject = ?" 

//     db.query(query, [subject], (err, results) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(results);
//         }
//     });

// }

// export const updateStudent = (req, res) => {
//     const {dos, dop, marks1, marks2, status, roll_no, a_id} = req.body; 

//     const query = "update student_assignments set dos = ?, dop = ?, marks1 = ?, marks2 = ?, status = ? where roll_no = ? and a_id = ? " ;

//     db.query(query, [dos, dop, marks1, marks2, status, roll_no, a_id], (err , results) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(results);
//         }
//     })
// }

// export const insertAssignment = (req, res) => {
//     const {subject , title, count } = req.body; 

//     const formattedCount = String(count).padStart(3, '0');
//     const a_id = subject+formattedCount ; 

//     const query = "insert into assignment (a_id, subject, title) VALUES (?, ?, ?)" ; 

//     if(subject != "CGL" || subject != "PBL" || subject != "DMSL" || subject != "EM-III" || subject != "PSDL"){
//         res.status(400).json({
//             success : false, 
//             message: "Invalid sbject provided !!!!"
//         })
//         return ;
//     }

//     db.query(query, [a_id, subject, title], (err , results) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(results);
//         }
//     })
// }; 

// 1. Get all assignments
export const getAllAssignments = async (req, res) => {
  const { data, error } = await supabase
    .from('assignment')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// 2. Get teacher details + batch info
export const getTeacher = async (req, res) => {
  const { teacherId, password } = req.body;

  const { data, error } = await supabase
    .from('teachers')
    .select(`
      *,
      batch_details(*)
    `)
    .eq('t_id', teacherId);

  if (error) return res.status(500).json({ error: error.message });

  if (!data || data.length === 0)
    return res.status(404).json({ message: 'Teacher not found' });

  if (data[0].password !== password)
    return res.status(401).json({ message: 'Incorrect password' });

  res.status(200).json(data);
};

// 3. Get students in assignment
export const getAssStudents = async (req, res) => {
  const { batch, a_id } = req.body;

  const { data, error } = await supabase
    .from('student_assignments')
    .select(`
      *,
      students(*)
    `)
    .eq('a_id', a_id)
    .eq('batch', batch);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

// 4. Get all assignments for a subject
export const getAllAss = async (req, res) => {
  const { subject } = req.body;

  const { data, error } = await supabase
    .from('assignment')
    .select('*')
    .eq('subject', subject);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

// 5. Update student assignment
export const updateStudent = async (req, res) => {
  const { dos, dop, marks1, marks2, status, roll_no, a_id } = req.body;

  const { data, error } = await supabase
    .from('student_assignments')
    .update({ dos, dop, marks1, marks2, status })
    .eq('roll_no', roll_no)
    .eq('a_id', a_id);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

// 6. Insert new assignment
export const insertAssignment = async (req, res) => {
  const { subject, title, count } = req.body;

  const formattedCount = String(count).padStart(3, '0');
  const a_id = subject + formattedCount;

  const allowedSubjects = ['CGL', 'PBL', 'DMSL', 'EM-III', 'PSDL'];
  if (!allowedSubjects.includes(subject)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid subject provided!',
    });
  }

  const { data, error } = await supabase
    .from('assignment')
    .insert([{ a_id, subject, title }]);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

// export const addLabSession = (req, res) => {
    
//     const {date, subject, t_id, start_roll, end_roll} = req.body ; 
    
//     try {   

//         if(!date || !subject || !t_id || !start_roll || !end_roll){
//             res.status(400).json({
//                 success: false ,
//                 message : "Please fill in all the details !"
//             })
//             return ;
//         }
//         const query = "call init_lab(? , ? , ? , ? , ?)"; 

//         db.query(query, [date, subject, t_id, start_roll, end_roll], (err , results) => {
//             if (err) {
//                 res.status(500).send(err);
//             } else {
//                 res.json(results);
//             }
//         })

//     } catch (error) {
        
//     }
// }; 

// export const get_Lab_Sessions = async(req, res) => {
//     const {subject , batch } = req.body ; 

//     try {
//         const query = "select subject , batch , lab_date from attendance where subject = ? and batch = ? group by lab_date ;" 

//         if(!subject || !batch ){
//             res.status(400).json({
//                 success: false , 
//                 message: "Subject or Batch not found "
//             })
//             return ; 
//         }

//         db.query(query, [subject, batch], (err , results) => {
//             if (err) {
//                 res.status(500).send(err);
//             } else {
//                 res.json(results);
//             }
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             success: false , 
//             message: "Backend gave up !!! "
//         })
        
//     }
// }


// export const deleteLabSession = (req, res) => {
//     const { subject, batch, lab_date } = req.body;

//     if (!subject || !batch || !lab_date) {
//         return res.status(400).json({
//             success: false,
//             message: "Missing required fields to delete lab session",
//         });
//     }

//     const query = "DELETE FROM attendance WHERE subject = ? AND batch = ? AND lab_date = ?";

//     try {
//         db.query(query, [subject, batch, lab_date], (err, results) => {
//             if (err) {
//                 console.error("Error executing query:", err);
//                 return res.status(500).json({
//                     success: false,
//                     message: "Database error",
//                 });
//             }

//             res.status(200).json({
//                 success: true,
//                 message: "Lab session deleted successfully",
//                 data: results,
//             });
//         });
//     } catch (error) {
//         console.log("Catch block error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Unexpected error occurred",
//         });
//     }
// };


// export const getStudents_Attendance = (req, res) => {
//         const { subject, batch, lab_date } = req.body;
    
//         if (!subject || !batch || !lab_date) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing required fields to delete lab session",
//             });
//         }
    
//         const query = "select * from attendance natural join students where subject = ? and batch = ? and lab_date = ?";
    
//         try {
//             db.query(query, [subject, batch, lab_date], (err, results) => {
//                 if (err) {
//                     console.error("Error executing query:", err);
//                     return res.status(500).json({
//                         success: false,
//                         message: "Database error",
//                     });
//                 }
    
//                 res.status(200).json({
//                     success: true,
//                     message: "Students fetched successfully",
//                     data: results,
//                 });
//             });
//         } catch (error) {
//             console.log("Catch block error:", error);
//             res.status(500).json({
//                 success: false,
//                 message: "Unexpected error occurred",
//             });
//         }

// }

// export const updateAttendance = (req, res) => {
//     const {present, roll_no , subject, batch, lab_date } = req.body;
    
//     if (!subject || !batch || !lab_date || !roll_no) {
//         return res.status(400).json({
//             success: false,
//             message: "Missing required fields to update lab session attendance",
//         });
//     }

//     const query = " update attendance set present = ? where roll_no = ? and batch = ? and subject = ? and lab_date = ? ";

//     try {
//         db.query(query, [present, roll_no, batch, subject, lab_date], (err, results) => {
//             if (err) {
//                 console.error("Error executing query:", err);
//                 return res.status(500).json({
//                     success: false,
//                     message: "Database error",
//                 });
//             }

//             res.status(200).json({
//                 success: true,
//                 message: "Students Attendance updated",
//                 data: results,
//             });
//         });
//     } catch (error) {
//         console.log("Catch block error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Unexpected error occurred",
//         });
//     }
// }


// export const updateUT = (req, res) => {
//     const { marks1, marks2, marks3 , subject, roll_no } = req.body;
    
//     if (!subject ||  !roll_no) {
//         return res.status(400).json({
//             success: false,
//             message: "Missing required fields to update lab session attendance",
//         });
//     }

//     const query = "update ut set marks1 = ?, marks2 = ?, marks3 = ? where subject = ? and roll_no = ? ; ";

//     try {
//         db.query(query, [marks1, marks2, marks3 , subject, roll_no ], (err, results) => {
//             if (err) {
//                 console.error("Error executing query:", err);
//                 return res.status(500).json({
//                     success: false,
//                     message: "Database error",
//                 });
//             }

//             res.status(200).json({
//                 success: true,
//                 message: "Students Marks updated",
//                 data: results,
//             });
//         });
//     } catch (error) {
//         console.log("Catch block error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Unexpected error occurred",
//         });
//     }
// }

export const addLabSession = async (req, res) => {
  const { date, subject, t_id, start_roll, end_roll } = req.body;

  if (!date || !subject || !t_id || !start_roll || !end_roll) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all the details!",
    });
  }

  try {
    const { data, error } = await supabase.rpc('init_lab', {
      p_date: date,
      p_subject: subject,
      p_t_id: t_id,
      p_start_roll: start_roll,
      p_end_roll: end_roll,
    });

    if (error) return res.status(500).json({ error });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const get_Lab_Sessions = async (req, res) => {
  const { subject, batch } = req.body;

  if (!subject || !batch) {
    return res.status(400).json({
      success: false,
      message: "Subject or Batch not found",
    });
  }

  try {
    const { data, error } = await supabase
      .from('attendance')
      .select('subject, batch, lab_date')
      .eq('subject', subject)
      .eq('batch', batch)
      .group('lab_date');

    if (error) return res.status(500).json({ error });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Unexpected error', error: err });
  }
};

export const deleteLabSession = async (req, res) => {
  const { subject, batch, lab_date } = req.body;

  if (!subject || !batch || !lab_date) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const { error } = await supabase
    .from('attendance')
    .delete()
    .eq('subject', subject)
    .eq('batch', batch)
    .eq('lab_date', lab_date);

  if (error) return res.status(500).json({ error });

  res.json({ success: true, message: "Lab session deleted" });
};

export const getStudents_Attendance = async (req, res) => {
  const { subject, batch, lab_date } = req.body;

  if (!subject || !batch || !lab_date) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const { data, error } = await supabase
    .from('attendance')
    .select('*, students(*)') // assuming foreign key exists
    .eq('subject', subject)
    .eq('batch', batch)
    .eq('lab_date', lab_date);

  if (error) return res.status(500).json({ error });

  res.json({ success: true, data });
};

export const updateAttendance = async (req, res) => {
  const { present, roll_no, subject, batch, lab_date } = req.body;

  const { error } = await supabase
    .from('attendance')
    .update({ present })
    .eq('roll_no', roll_no)
    .eq('subject', subject)
    .eq('batch', batch)
    .eq('lab_date', lab_date);

  if (error) return res.status(500).json({ error });

  res.json({ success: true, message: "Attendance updated" });
};

export const updateUT = async (req, res) => {
  const { marks1, marks2, marks3, subject, roll_no } = req.body;

  const { error } = await supabase
    .from('ut')
    .update({ marks1, marks2, marks3 })
    .eq('subject', subject)
    .eq('roll_no', roll_no);

  if (error) return res.status(500).json({ error });

  res.json({ success: true, message: "UT updated" });
};


// export const getUt = (req, res) => {
//     const {  subject, batch } = req.body;
    
//     if (!subject || !batch) {
//         return res.status(400).json({
//             success: false,
//             message: "Missing required fields to update ut marks attendance",
//         });
//     }

//     const query = " select * from ut where subject = ? and batch = ? ; ";

//     try {
//         db.query(query, [subject, batch ], (err, results) => {
//             if (err) {
//                 console.error("Error executing query:", err);
//                 return res.status(500).json({
//                     success: false,
//                     message: "Database error",
//                 });
//             }

//             res.status(200).json({
//                 success: true,
//                 message: "Students Marks updated",
//                 data: results,
//             });
//         });
//     } catch (error) {
//         console.log("Catch block error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Unexpected error occurred",
//         });
//     }
// }; 


// export const termWork1 = (req, res) => {
//     const {  subject, batch, roll_no } = req.body;
    
//     if (!subject || !batch) {
//         return res.status(400).json({
//             success: false,
//             message: "Missing required fields to get tw1 calc",
//         });
//     }

//     const query = "SELECT SUM(COALESCE(sa.marks1, 0)) + SUM(COALESCE(sa.marks2, 0)) AS total_psdl_marks,SUM(5) + SUM(5) AS total_psdl_marks_capped FROM student_assignments sa JOIN students s ON sa.roll_no = s.roll_no WHERE sa.a_id LIKE CONCAT( ? , '%') AND s.batch = ? AND sa.roll_no = ? AND (sa.marks1 IS NOT NULL OR sa.marks2 IS NOT NULL);"

//     try {
//         db.query(query, [subject, batch, roll_no ], (err, results) => {
//             if (err) {
//                 console.error("Error executing query:", err);
//                 return res.status(500).json({
//                     success: false,
//                     message: "Database error",
//                 });
//             }

//             res.status(200).json({
//                 success: true,
//                 message: "Students Marks updated",
//                 data: results,
//             });
//         });
//     } catch (error) {
//         console.log("Catch block error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Unexpected error occurred",
//         });
//     }
// }; 

// export const tw2 = (req, res) => {
//     const {  subject, batch, roll_no } = req.body;
    
//     if (!subject || !batch) {
//         return res.status(400).json({
//             success: false,
//             message: "Missing required fields to get tw2 calc",
//         });
//     }

//     const query = "SELECT COUNT(CASE WHEN present = 1 THEN 1 END) AS total_present, COUNT(*) AS total_records FROM attendance WHERE roll_no = ? AND subject = ? AND batch = ?;"

//     try {
//         db.query(query, [roll_no, subject, batch  ], (err, results) => {
//             if (err) {
//                 console.error("Error executing query:", err);
//                 return res.status(500).json({
//                     success: false,
//                     message: "Database error",
//                 });
//             }

//             res.status(200).json({
//                 success: true,
//                 message: "Students Marks updated",
//                 data: results,
//             });
//         });
//     } catch (error) {
//         console.log("Catch block error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Unexpected error occurred",
//         });
//     }
// }

// export const tw3 = (req, res) => {
//     const {  subject, roll_no } = req.body;
    
//     if (!subject || !roll_no) {
//         return res.status(400).json({
//             success: false,
//             message: "Missing required fields to get tw2 calc",
//         });
//     }

//     const query = "SELECT roll_no, student_name, subject, (marks1 + marks2 + marks3) AS total_marks FROM ut WHERE subject = ? AND roll_no = ? ;"

//     try {
//         db.query(query, [ subject, roll_no ], (err, results) => {
//             if (err) {
//                 console.error("Error executing query:", err);
//                 return res.status(500).json({
//                     success: false,
//                     message: "Database error",
//                 });
//             }

//             res.status(200).json({
//                 success: true,
//                 message: "Students Marks updated",
//                 data: results,
//             });
//         });
//     } catch (error) {
//         console.log("Catch block error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Unexpected error occurred",
//         });
//     }
// }

export const getUt = async (req, res) => {
  const { subject, batch } = req.body;

  if (!subject || !batch) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields to fetch UT marks",
    });
  }

  try {
    const { data, error } = await supabase
      .from('ut')
      .select('*')
      .eq('subject', subject)
      .eq('batch', batch);

    if (error) return res.status(500).json({ success: false, error });

    res.status(200).json({
      success: true,
      message: "Students Marks fetched",
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const termWork1 = async (req, res) => {
  const { subject, batch, roll_no } = req.body;

  if (!subject || !batch || !roll_no) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields for TW1 calculation",
    });
  }

  try {
    const { data, error } = await supabase.rpc('calculate_tw1', {
      p_subject: subject,
      p_batch: batch,
      p_roll_no: roll_no,
    });

    if (error) return res.status(500).json({ success: false, error });

    res.status(200).json({
      success: true,
      message: "TW1 Marks Calculated",
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const tw2 = async (req, res) => {
  const { subject, batch, roll_no } = req.body;

  if (!subject || !batch || !roll_no) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields for TW2 calculation",
    });
  }

  try {
    const { data, error } = await supabase.rpc('calculate_tw2', {
      p_subject: subject,
      p_batch: batch,
      p_roll_no: roll_no,
    });

    if (error) return res.status(500).json({ success: false, error });

    res.status(200).json({
      success: true,
      message: "TW2 Marks Calculated",
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
export const tw3 = async (req, res) => {
  const { subject, roll_no } = req.body;

  if (!subject || !roll_no) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields for TW3 calculation",
    });
  }

  try {
    const { data, error } = await supabase
      .from('ut')
      .select('roll_no, student_name, subject, marks1, marks2, marks3')
      .eq('subject', subject)
      .eq('roll_no', roll_no)
      .single();

    if (error) return res.status(500).json({ success: false, error });

    const total_marks =
      (data?.marks1 || 0) + (data?.marks2 || 0) + (data?.marks3 || 0);

    res.status(200).json({
      success: true,
      message: "TW3 Marks Calculated",
      data: {
        ...data,
        total_marks,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
