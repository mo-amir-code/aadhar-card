const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    dob: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);