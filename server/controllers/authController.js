const User = require("../models/User");
const bcrypt = require("bcrypt");


exports.signup = async (req, res) => {
    try {
        const { name, email, phone, dob, address, password } = req.body;

        if(!name || !email || !phone || !dob || !address || !password){
            return res.status(400).json({
                success: false,
                message: "Required field is/are missing"
            });
        }

        const user = await User.findOne({ email });

        if(user){
            return res.status(400).json({
                success: false,
                message: "Email is already registered"
            });
        }

        const uid = generateUID();
        const hashedPassword = await bcrypt.hash(password, 12);

        const data = {
            uid,
            name,
            email,
            phone,
            password: hashedPassword,
            dob,
            address
        }

        const newUser = await User.create(data);       

        return res.status(200).json({
            success: true,
            message: "You are registered successfully",
            data: newUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal error occurred!"
        });
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Required field is/are missing"
            });
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                success: false,
                message: "You are not registered!"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                success: false,
                message: "Email or password is incorrect"
            });
        }
    

        return res.status(200).json({
            success: true,
            message: "You are registered successfully",
            data: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal error occurred!"
        });
    }
}


function generateUID() {
    const timestamp = Date.now().toString();
    const randomNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const uid = "AAD" + timestamp + randomNumber;
    return uid.slice(0, 16);
}