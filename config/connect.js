import mongoose from "mongoose";
const MONGODB_URI = 'mongodb+srv://arjunporwal:123arjun456@cluster0.tehrbdn.mongodb.net/water-quality-monitoring-system?retryWrites=true&w=majority'

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside config/connect.js file'
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
        console.log('Database Connected');
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default dbConnect