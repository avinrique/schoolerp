const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const classSchema = new Schema({
    class: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true,
        default : null
    }
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;
