const express = require("express");
let router = express.Router()
const { verifyToken } = require("../controllers/auth")
const { fetchNotesOfUser, addNote, deleteNote, getNoteById, updateNote, veliya, test } = require("../controllers/note")

//params
router.param("noteId", getNoteById)

router.get('/fetchnotes', verifyToken, fetchNotesOfUser)
router.post('/addnote', verifyToken, addNote)
router.delete('/deletenote/:noteId', verifyToken, deleteNote)
router.put('/updatenote/:noteId', verifyToken, updateNote)


router.get('/veliya', veliya)


module.exports = router;