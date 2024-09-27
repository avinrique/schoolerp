const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const teacherSchema = new Schema({
    firstName: {
        type: String,
        
        trim: true
    },
    password: {
        type: String,
            },
    lastName: {
        type: String,
        
        trim: true
    },
    email: {
        type: String,
        
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        
        trim: true
    },
    employeeId: {
        type: String,
        
        unique: true,
        trim: true
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',  
            }],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject', 
            }],
    dateOfJoining: {
        type: Date,
            },
    address: {
        street: { type: String, },
        city: { type: String, },
        state: { type: String, },
        zip: { type: String, }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
