const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true,
    },
    subjects: {
        type: [String],
        required: true,
    },
    term: {
        type: String,
        required: true,
    },
    marks: {
        type: [Number],
        required: false
    }

})

var studentdata = mongoose.model('studentdata', studentSchema);
module.exports = studentdata;