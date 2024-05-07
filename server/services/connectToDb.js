const mongoose = require("mongoose");

exports.connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected...")
    } catch (error) {
        console.log("Error occurred while database connection!");
        console.error(error);
    }
}