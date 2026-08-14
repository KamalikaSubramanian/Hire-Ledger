import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

// The ! tells TypeScript:
// "I know this value exists."

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

//Extends Node.js's global object by adding a custom property (mongooseConnection) that TypeScript will recognize.
declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      } | undefined;
}

const cached = global.mongooseConnection ?? {
  conn: null,
  promise: null,
};

global.mongooseConnection = cached;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "hire_ledger",
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}






