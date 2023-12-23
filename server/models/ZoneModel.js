const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    city:
        {
        type: [ mongoose.Schema.Types.ObjectId],
        ref: 'City'
        },
    zoneManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;
