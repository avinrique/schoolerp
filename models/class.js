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

const Classs = mongoose.model('Classs', classSchema);
module.exports = Classs;
