const express = require("express");
const app = express();
require("dotenv").config()
const authRoutes = require("./routes/auth")
const noteRoutes = require("./routes/note")
const mongoose = require("mongoose")
const cors = require('cors');
// Mongo Connection
mongoose.connect(process.env.MONGO_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive : true
})
    .then(() => console.log("Connected with DB"))
    .catch(err => console.log(err))



// .uses
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", authRoutes);
app.use("/api", noteRoutes);

// No Route
app.all("*", (req, res) => {
    return res.json({
        err: "end point not found !!"
    })
})

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`App running on port : ${process.env.PORT}`);
})