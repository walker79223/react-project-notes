const express = require("express");
let router = express.Router()
const jwt = require("jsonwebtoken")
const { signUp, signIn, signOut, verifyToken, getUserById } = require("../controllers/auth")

router.post("/signup", signUp)
router.post("/signin", signIn)
router.get("/signout", signOut)


router.get("/profile", verifyToken, getUserById)

module.exports = router;