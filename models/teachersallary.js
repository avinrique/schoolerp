const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const salarySchema = new Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    baseSalary: {
        type: Number,
        required: true
    },
    bonus: {
        type: Number,
        default: 0
    },
    deductions: {
        type: Number,
        default: 0
    },
    paymentDate: {
        type: Date,
        required: true
    },
    salaryPeriod: {
        type: String,
        required: true,
        enum: ['Monthly', 'Quarterly', 'Annually']
    },
    totalPaid: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
