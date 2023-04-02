import mongoose from 'mongoose'

const LiveDataSchema = new mongoose.Schema({
    sensorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sensor'
    },
    data: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.models.LiveData || mongoose.model('LiveData', LiveDataSchema)