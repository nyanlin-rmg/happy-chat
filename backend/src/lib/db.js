import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.DB_URI)
            .then(conn => console.log("MongoDB connected: ", conn.connection.host))
            .catch(error => {
                console.log(error);
                process.exit(1);
            });
}