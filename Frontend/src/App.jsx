import { useState } from "react";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import Alert from "./Components/Alert";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Contexts/NoteState";
import Notes from "./Components/Notes";
const host = process.env.BACK_END_HOST


export default function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (type, msg) => {
    setAlert({
      type,
      msg
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login host={host} showAlert={showAlert} />}></Route>
            <Route exact path="/signup" element={<Signup host={host} showAlert={showAlert} />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/notes" element={<Notes showAlert={showAlert}/>}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}