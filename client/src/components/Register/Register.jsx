import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { authService } from '../../services/authService';
import { ToastContainer, toast } from 'react-toastify';

import './Register.css';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });
    const navigate = useNavigate();

    const [avatar, setAvatar] = useState(null);
    
    const registerUser = (data) => {
        authService.register(data, avatar)
            .then(() => {
                navigate('/share-day');
            })
            .catch((err) => {
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            });
    }

    return (
        <section className="flex flex-col items-center">
            <h1 className="title">Register</h1>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <form onSubmit={handleSubmit(registerUser)}>
                <article className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="username" name="username" id="username" {...register('username', { required: { value: true, message: 'Usernmae is required!' } })}  className="form-input"/>
                    {errors.username && <p>{errors.username.message}</p>}
                </article>
                
                <article className="input-group">
                    <label htmlFor="email">Parent Email</label>
                    <input type="email" name="parentEmail" id="email" {...register('parentEmail', { required: { value: true, message: 'Email is required!' } })}  className="form-input"/>
                    {errors.email && <p>{errors.email.message}</p>}
                </article>

                <article className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" {...register('password', { required: {value: true, message: 'Password is required!'}})} className="form-input"/>
                    {errors.password && <p>{errors.password.message}</p>}
                </article>
                
                <article className="input-group">
                    <label htmlFor="repeat-password">Confirm Password</label>
                    <input type="password" name="repeatPassword" id="repeat-password" {...register('repeatPassword', { required: {value: true, message: 'Repeat password is required!'}})}  className="form-input"/>
                    {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
                </article>

                <article className="input-group">
                    <label htmlFor="avatar">Choose your Avatar</label>
                    <section className="flex mt-5">
                        <article className="flex flex-col items-center">
                            <img src="https://res.cloudinary.com/drinka/image/upload/v1648977221/da-day/cat/cat-main_jmglcl.png" alt="Cat"  onClick={() => setAvatar(1)} className="avatar"/>
                        </article>

                        <article className="flex flex-col items-center">
                            <img src="https://res.cloudinary.com/drinka/image/upload/v1648973984/da-day/duck/duck-main_nz3pab.png" alt="Duck" onClick={() => setAvatar(2)} className="avatar"/>
                        </article>
                    </section>
                </article>

                <article className="input-group">
                    <input type="submit" value="Register" />
                </article>
            </form>
        </section>
    );
}

export default Register;