// import db from '../DB/db.js'

import supabase from '../DB/db.js';

export const getStudentDashboard = async (req, res) => {
  const { roll_no } = req.body;

  if (!roll_no) {
    return res.status(400).json({
      success: false,
      message: 'Roll number is required',
    });
  }

  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        student_assignments(*)
      `)
      .eq('roll_no', roll_no);

    if (error) {
      return res.status(500).json({ success: false, error });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unexpected error',
      error: err.message,
    });
  }
};



// export const getStudentDashboard = (req, res) => {
//     const {roll_no} = req.body; 

//     const query = "select * from students natural join student_assignments where roll_no = ?" 

//     db.query(query, [roll_no], (err, results) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(results);
//         }
//     })
// }
