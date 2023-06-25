import { useState, useEffect } from "react";
import NoteContext from "./NoteContext";
import axios from "axios";

const NoteState = (props) => {
  const token = `Bearer ${localStorage.getItem("token")}`;
  const hasToken = localStorage.getItem('token') !== null;

  let sampleNotes = [];
  const [NoteState, setNoteState] = useState(sampleNotes)
  // fetch Note
  useEffect(() => {
    if (hasToken) {

      const url = `http://localhost:7000/api/fetchnotes`;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
      };
      axios.get(url, { headers })
        .then(function (response) {
          if (response.data.success) {
            sampleNotes.push(response.data.fetchedNote);
            setNoteState(response.data.fetchedNote)

          } else {
            props.showAlert("danger", response.data.msg);
          }
        })
        .catch(function (error) {
          console.log('Error:', error);
        });
    }
  })

  // Add a Note
  const addNote = (data) => {
    const url = `http://localhost:7000/api/addnote`;
    const requestData = data;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    axios.post(url, requestData, { headers })
      .then(function (response) {
        if (response.data.success) {
          props.showAlert("success", response.data.msg);
          sampleNotes.push(response.data.savedNote)
          setNoteState(sampleNotes)
          props.showAlert("info", response.data.msg);

        } else {
          props.showAlert("danger", response.data.msg);
        }
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  }

  // Dlt a Note
  const deleteNote = (noteId) => {
    const url = `http://localhost:7000/api/deletenote/${noteId}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    axios.delete(url, { headers })
      .then(function (response) {
        if (response.data.success) {
          props.showAlert("info", response.data.msg)

        } else {
          props.showAlert("danger", response.data.msg);
        }
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  }

  // update a Note
  const updateNote = (noteId, noteData) => {
    const url = `http://localhost:7000/api/updatenote/${noteId}`;
    const requestData = noteData;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    axios.put(url, requestData, { headers })
      .then(function (response) {
        if (response.data.success) {
          props.showAlert("info", response.data.msg)

        } else {
          props.showAlert("danger", response.data.msg);
        }
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  }
  return (
    <NoteContext.Provider value={[{ NoteState, addNote, deleteNote, updateNote }]}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
