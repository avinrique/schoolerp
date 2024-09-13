const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feeSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', 
        required: true
    },
    amountDue: {
        type: Number,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true,
        default: 0
    },
    feeType: {
        type: String,
        required: true,
        enum: ['Tuition', 'Exam', 'Library', 'Hostel', 'Other']  // Types of fees
    },
    dueDate: {
        type: Date,
        required: true
    },
    paymentDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Paid', 'Unpaid', 'Partially Paid', 'Overdue'],
        default: 'Unpaid'
    },
    transactionId: {
        type: String,
        trim: true
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Bank Transfer', 'Credit Card', 'Debit Card', 'UPI'],
        required: true
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

const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;
