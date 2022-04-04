import { useState, useEffect } from "react";
import {notesService} from '../../../services/notesService';
import { formatDate } from "../../../utils";
import { Link } from "react-router-dom";

import './AllNotes.css';

const AllNotes = () => {
    const [notes, setNotes] = useState([]);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    useEffect(() => {
        notesService.getReport(user.user_id)
            .then((response) => {
                setNotes(response.map(obj => { 
                    return { id: obj.id, description: obj.description, date: formatDate(obj.date)};
                }));
            })
            .catch(err => {
                console.log(err);
            });
    }, [user.user_id]);


    return (
        <section className="flex flex-wrap justify-around pt-5">
            {notes.map((note, i) => 
                <article className="note text-black bg-white rounded-xl transition duration-1000 ease-in-out w-80 h-full my-6 mx-6 p-5 break-words" key={i}>

                    <p>{note.description}</p>

                    <div className="dateMade">
                        <p>Date: {note.date}</p>
                    </div>

                    <Link to={`/notes/${user.user_id}/${note.id}`} className="ml-4">{'>'} Read note</Link>
                </article>
            )}
        </section>
    );
}

export default AllNotes;