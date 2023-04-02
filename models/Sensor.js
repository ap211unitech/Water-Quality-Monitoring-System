import mongoose from 'mongoose'

const SensorSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location'
    },
    sensorId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.models.Sensor || mongoose.model('Sensor', SensorSchema)