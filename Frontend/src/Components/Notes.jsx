import React, { useState, useContext } from 'react';
import Notecard from "./Notecard";
import noteContext from '../Contexts/NoteContext';

const Notes = () => {
    const hasToken = localStorage.getItem('token') !== null;
    const a = useContext(noteContext);
    const [data, setData] = useState({
        title: "",
        description: "",
        tag: ""
    });

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleClick = (e) => {
        e.preventDefault();
        a[0].addNote(data)
        setData({
            title: "",
            description: "",
            tag: ""
        });
    };
    if (hasToken) {


        return (
            <div className="container">
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" name='title' value={data.title} onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" name='description' value={data.description} onChange={handleOnChange} className="form-control" id="description" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" name='tag' value={data.tag} onChange={handleOnChange} className="form-control" id="tag" />
                    </div>
                    <button type="submit" onClick={handleClick} className="btn btn-primary my-3 mb-5">Submit</button>
                </form>
                <div className="d-flex flex-row mb-3" style={{ flexWrap: "wrap" }}>
                    {a[0].NoteState.map(data => {
                        const { title, description, tag, _id } = data

                        return <Notecard key={_id} _id={_id} title={title} description={description} tag={tag} />
                    })}
                </div>
            </div>
        );
    } else {
        return (
            <h2 className='text-center'>Err : Login to use iNoteBook</h2>
        )
    }
};

export default Notes;
