import mongoose from 'mongoose'

const LiveDataSchema = new mongoose.Schema({
    sensorId: {
        type: String,
        required: true,
        trim: true,
    },
    data: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true })

module.exports = mongoose.models.LiveData || mongoose.model('LiveData', LiveDataSchema)