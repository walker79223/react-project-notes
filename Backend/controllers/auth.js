const User = require("../models/User")
require("dotenv").config()
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
    const userToBeSaved = new User(req.body);
    userToBeSaved.save()
        .then((doc) => {
            const token = jwt.sign({ _id: doc._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5d" })
            res.json({ msg: "Account created successfully", success: true, token })
        })
        .catch(err => {
            if (err.code === 11000) {
                return res.json({ msg: "Email already exists", success: false })
            }
            res.json({ msg: "Err occured", success: false })
        })
}


exports.signIn = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user.authenticate(password)) {
                return res.json({
                    msg: "Email and password didn't matched !!"
                })
            }

            const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5d" })
            return res.json({
                token,
                success : true, msg : "Signed In Successfully"
            })
        })
        .catch((err) => {
            res.json({ msg: "No user found" })
            console.log(err);
        })
}

exports.signOut = (req, res) => {
    res.clearCookie("token")
    return res.json({
        msg: "user signed out"
    })
}


exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Missing token" });
    }
    try {
        let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: "Invalid token" });
    }
};



exports.getUserById = (req, res) => {
    User.findById(req.user._id)
        .then(userFetched => {
            res.json({userFetched : userFetched.name, success : true})
        })
        .catch(err => {
            console.log(err);
            return res.json({ err: "Err occured" })
        })
}   