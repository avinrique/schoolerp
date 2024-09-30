const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingAdmissionSchema = new Schema({
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    grade: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    parentName: {
        type: String,
        required: true,
        trim: true
    },
    parentContact: {
        type: String,
        required: true,
        trim: true
    },
    parentEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    address: {
        street: { type: String,},
        city: { type: String,},
        state: { type: String},
        zipCode: { type: String}
    },
    previousSchool: {
        type: String
    },
    reasonForAdmission: {
        type: String
    },
    preferredLanguage: {
        type: String,
        required: true
    },
    birthCertificate: {
        type: String, 
        required: true
    },
    transferCertificate: {
        type: String 
    },
    additionalInfo: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Enrolled'],
        default: 'Pending'
    },
    dateOfApplication: {
        type: Date,
        default: Date.now
    }
});

const PendingAdmission = mongoose.model('PendingAdmission', pendingAdmissionSchema);
module.exports = PendingAdmission;
