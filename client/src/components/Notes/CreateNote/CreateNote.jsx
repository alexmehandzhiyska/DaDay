import { useEffect } from "react";
import { useState } from "react";
import { notesService } from "../../../services/notesService";
import { useForm } from "react-hook-form";

import { avatarData } from '../../../avatarData';

import './CreateNote.css';

const CreateNote = () => {
    const [question, setQuestion] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [emotion, setEmotion] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    const { register, handleSubmit } = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });

    const emotions = avatarData[user.avatar - 1];

    useEffect(() => {
        setIsLoading(true);

        notesService.getOne(user.user_id)
            .then(response => {
                const question = response.question.replace(/<.+>/, user.username);
                setQuestion(question);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, [user.user_id, user.username]);

    const sendAnswer = (data) => {
        notesService.createOne(user, { avatar: emotion, text: data.description })
            .then(() => {
                setIsSubmitted(true);
            })
            .catch(err => {
                console.log(err);
            });
    } 

    return (
        <section className="flex flex-col items-center justify-center">
            {isLoading && <p>Loading ...</p>}
            {!isLoading && !emotion &&
                <section className="flex px-10">
                    <article className="animated-img mt-32">
                        <img src={emotions[1]} alt="Avatar" className="animated-avatar"/>
                    </article>

                    <article className="emotions flex flex-col items-center mt-28">
                        <h1 className="text-5xl my-10 text-center">{question}</h1>
                        <section className="flex flex-wrap mt-10">
                            {emotions.slice(2).map((emotion, i) => <img key={i} onClick={() => setEmotion(i + 1)} src={emotion} alt="avatar" className="emotion-card w-28 h-28 mx-3 my-5 rounded-3xl"/>)}
                        </section>
                    </article>
                </section>
            }

            {!isLoading && emotion && !isSubmitted &&
                <section className="flex px-10">
                    <article className="animated-img mt-32">
                        <img src={emotions[1]} alt="Avatar" className="animated-avatar"/>
                    </article>

                    <article className="answer flex flex-col items-center mt-28">
                        <h1 className="text-5xl my-10 text-center">Why do you feel this way?</h1>
                        
                        <form onSubmit={handleSubmit(sendAnswer)} className="flex flex-col">
                            <textarea {...register('description', { required: { value: true } })} name="description" type="text" className="desc mt-20 bg-transparent border-2 border-orange-200" />
                            <input type="submit" value="Send Answer" />
                        </form>
                    </article>
                </section>
            }

            {!isLoading && emotion && isSubmitted &&
                <section className="flex px-10">
                    <article className="animated-img mt-32">
                        <img src={emotions[1]} alt="Avatar" loop="infinite" className="animated-avatar"/>
                    </article>

                    <article>
                        <h1 className="title mt-36">Thank you for your response! I'd be glad to chat with you tomorrow too!</h1>
                    </article>
                </section>
            }
        </section>
    )
}

export default CreateNote;