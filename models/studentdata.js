const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
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
    orders: {
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

var customerdata = mongoose.model('customerdata', customerSchema);
module.exports = customerdata;