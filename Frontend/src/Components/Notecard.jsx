import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom"
import noteContext from '../Contexts/NoteContext';

const Notecard = (props) => {
    const a = useContext(noteContext)
    const [data, setData] = useState({
        title: props.title,
        description: props.description,
        tag: props.tag
    });

    const handleDeleteClick = () => {
        a[0].deleteNote(props._id);
    }
    const handleUpdateClick = () => {
        const myModal = document.getElementById('myModal')
        const myInput = document.getElementById('myInput')
        myModal.addEventListener('shown.bs.modal', () => {
            myInput.focus()
        })

    }
    const handleSave = () => {
        a[0].updateNote(props._id, data);
    }

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="p-2 mx-2 my-2">
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{props.tag}</h6>
                        <p className="card-text">{props.description}</p>
                        <Link onClick={handleUpdateClick} id='myModal' data-bs-target="#exampleModal" data-bs-toggle="modal" className="card-link"><i className="fa-sharp fa-solid fa-pen-to-square"></i></Link>
                        <Link onClick={handleDeleteClick} className="card-link"><i className="fa-sharp fa-solid fa-trash"></i></Link>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update your note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div >
                                <label htmlFor="title" className="form-label my-2">Title</label>
                                <input type="text" name='title' value={data.title} onChange={handleOnChange} className="my-2 form-control" id="title" />
                            </div>
                            <div >
                                <label htmlFor="description" className="form-label my-2">Description</label>
                                <input type="text" name='description' value={data.description} onChange={handleOnChange} className="form-control" id="description" />
                            </div>
                            <div >
                                <label htmlFor="tag" className="form-label my-2">Tag</label>
                                <input type="text" name='tag' value={data.tag} onChange={handleOnChange} className="mb-4 form-control" id="tag" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                            <button type="button" onClick={handleSave} data-bs-dismiss="modal" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notecard