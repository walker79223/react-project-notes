const Note = require("../models/Note")

exports.fetchNotesOfUser = async (req, res) => {
    try {
        let fetchedNote = await Note.find({ user: req.user._id });
        res.json({ fetchedNote, success: true }); // Send the response once
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: "Internal server error" }); // Send the error response
    }
};

exports.addNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body
        if (title == "" || description == "" || tag == "") {
            return res.json({ success: false, msg: "Empty fields" })
        }
        let newNote = new Note({
            title, description, tag, user: req.user._id
        });
        let savedNote = await newNote.save();
        res.json({ success: true, savedNote, msg: "Note added successfully" })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, msg: "Unexpected error occured" })
    }
}

exports.deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.note._id);
        return res.json({ msg: "Note deleted successfully", success : true })
    } catch (error) {
        console.log(error);
        return res.json({ err: "failed to delete the note" })
    }
}

exports.getNoteById = async (req, res, next, id) => {
    try {
        let fetchedNote = await Note.findById(id);
        req.note = fetchedNote
        next()
    } catch (error) {
        console.log(error);
        res.json({ err: "Can not fetch note by id" })
    }

}

exports.updateNote = async (req, res) => {
    try {
        await Note.findByIdAndUpdate(req.note._id, {
            $set: req.body
        }, {
            upsert: true
        })
        let fetchedNote = await Note.findById(req.note._id)
        return res.json({fetchedNote, msg : "Note updated successfully", success : true})
    } catch (error) {
        console.log(error);
        return res.json({ err: "Failed to udpate the note" })
    }
}

exports.veliya = async (req, res) => {
    try {
        let fetchedNotes = await Note.find({}).limit(3)
        return res.json(fetchedNotes)
    } catch (error) {
        console.log(error);
        return res.send("Internal Server Error")
    }
}