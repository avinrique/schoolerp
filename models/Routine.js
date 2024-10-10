const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routineSchema = new Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    dayOfWeek: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: true
    },
    timeSlot: {
        startTime: { type: String }, 
        endTime: { type: String }   
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classs',
        required: true
    },
    roomNumber: {
        type: String,
        required: false,
        default :"1"
    },
    notes: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Routine = mongoose.model('Routine', routineSchema);
module.exports = Routine;
