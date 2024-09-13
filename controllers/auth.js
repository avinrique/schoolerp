const User = require('./../models/User');  
const Teacher = require('../models/Teachers'); 
const jwt = require('jsonwebtoken');

exports.getloginController = async (req, res) =>{
    res.render('login')    
}
exports.postloginController = async (req, res) =>{
    const { email, password, role } = req.body; 

    try {
        if (role === 'admin') {
           
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Admin not found' });

            const isMatch = await user.matchPassword(password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

           
            const token = jwt.sign({ id: user._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, role: 'admin' });
        } else if (role === 'teacher') {
           
            const teacher = await Teacher.findOne({ email });
            if (!teacher) return res.status(400).json({ message: 'Teacher not found' });

            const isMatch = await teacher.matchPassword(password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

            
            const token = jwt.sign({ id: teacher._id, role: 'teacher' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, role: 'teacher' });
        } else {
            res.status(400).json({ message: 'Invalid role' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
