import db from '../DB/db.js'

export const getStudentDashboard = (req, res) => {
    const {roll_no} = req.body; 

    const query = "select * from students natural join student_assignments where roll_no = ?" 

    db.query(query, [roll_no], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    })
}
