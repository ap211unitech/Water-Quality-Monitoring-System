import mongoose from 'mongoose'

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
}, { timestamps: true })

module.exports = mongoose.models.Location || mongoose.model('Location', LocationSchema)