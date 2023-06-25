import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export default function Login(props) {
    const hasToken = localStorage.getItem('token') !== null;
    let history = useNavigate()
    if (localStorage.getItem("token")) {
        history("/")
    }
    const [creds, setCreds] = useState({
        email: "",
        password: ""
    })
    const handleOnChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        e.preventDefault()
        const url = `http://localhost:7000/api/signin`;
        const requestData = creds
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.post(url, requestData, { headers })
            .then(function (response) {
                if (response.data.success) {
                    localStorage.setItem("token", response.data.token)
                    props.showAlert("info", response.data.msg)
                    history("/about")
                } else {
                    props.showAlert("danger", response.data.msg)
                }
            })
            .catch(function (error) {
                console.log('Error:', error);
            });
    }
    if (!hasToken) {
        return (
            <div className='container'>
                <h2 className='my-5'>Login to iNoteBook</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={creds.email} name="email" onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={creds.password} name='password' onChange={handleOnChange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" disabled={creds.email && creds.password.length >= 5 ? false : true} onClick={handleClick} className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        )
    } else {
        return (
            <>
                <h2 className='container text-center'>Error : Already Logged In</h2>
            </>
        )
    }
}
