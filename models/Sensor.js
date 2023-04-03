import mongoose from 'mongoose'

const SensorSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location',
        required: true
    },
    sensorId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['water', 'tds', 'ph'],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.models.Sensor || mongoose.model('Sensor', SensorSchema)