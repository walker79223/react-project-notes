import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';



const Signup = (props) => {
    const hasToken = localStorage.getItem('token') !== null;
    const history = useNavigate()
    const [creds, setCreds] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handleClick = async (e) => {
        e.preventDefault()
        const url = `http://localhost:7000/api/signup`;
        const requestData = creds
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.post(url, requestData, { headers })
            .then(function (response) {
                if (response.data.success) {
                    localStorage.setItem("token", response.data.token)
                    props.showAlert("info", response.data.msg)
                    history('/')
                }

            })
            .catch(function (error) {
                console.log('Error:', error);
            });
        setCreds({
            name: "",
            email: "",
            password: ""
        })
    }
    const handleOnChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })

    }
    if (!hasToken) {
        return (
            <div className='container my-5'>
                <h2 className='my-4'>Sign Up to use iNoteBook</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label">Name</label>
                        <input type="text" value={creds.name} name='name' onChange={handleOnChange} className="form-control" id="nameInput" aria-describedby="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={creds.email} onChange={handleOnChange} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='password' value={creds.password} onChange={handleOnChange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div id="emailHelp" className="form-text ">Already a user ? <Link className='link-offset-2 link-underline link-underline-opacity-0' to="/login">Login</Link></div>

                    <button type="submit" onClick={handleClick} className="btn btn-primary my-2">Submit</button>
                </form>
            </div>
        )
    } else {
        return (
            <>
                <h2 className='container text-center'>Can't Signup : Already Logged In</h2>
            </>
        )
    }
}

export default Signup;