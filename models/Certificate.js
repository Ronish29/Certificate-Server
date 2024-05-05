const mongoose = require('mongoose')

const certificateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    dateOfApproval: {
        type: Date,
        required: true
    },
    certificateLink: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    certificateId:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Certificate', certificateSchema)