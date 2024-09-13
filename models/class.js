const classSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gradeLevel: {
        type: String,
        required: true
    }
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;
