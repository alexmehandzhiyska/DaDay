import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { notesService } from "../../../services/notesService";
import { formatDate } from "../../../utils";
import { Link } from "react-router-dom";

const NoteDetails = () => {
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { userId, noteId } = useParams();

    useEffect(() => {
        notesService.getNote(noteId)
            .then(response => {
                const note = response.note;
                note.date = formatDate(note.date);

                setNote(note);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [noteId]);
    
    return (
        <section className="flex justify-center pt-10">
            {isLoading && <p>Loading...</p>}
            {!isLoading && 
                <article className="note text-black bg-white rounded-xl transition duration-1000 ease-in-out w-1/2 my-6 mx-6 break-words p-5">
                    <p>{note.description}</p>

                    <div className="dateMade">
                        <p>Date: {note.date}</p>
                    </div>

                    <Link to={`/notes/${userId}`} className="ml-4">{'>'} Go Back</Link>
                </article>
            }
        </section>
       
    );
}

export default NoteDetails;