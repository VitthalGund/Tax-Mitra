import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URL || "";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGO_URL environment variable");
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
