import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';

import { authService } from "../../services/authService";

import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });
    const navigate = useNavigate();

    const loginUser = (data) => {
        authService.login(data)
            .then(() => {
                navigate('/share-day');
            })
            .catch(() => {
                toast.error('Wrong username or password!', {
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
            <h1 className="title">Log In</h1>

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

            <form onSubmit={handleSubmit(loginUser)} id="login-form">
                <article className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="username" name="username" id="username" {...register('username', { required: { value: true, message: 'Username is required!' } })}  className="form-input"/>
                    {errors.username && <p>{errors.username.message}</p>}
                </article>

                <article className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" {...register('password', { required: {value: true, message: 'Password is required!'}})} className="form-input"/>
                    {errors.password && <p>{errors.password.message}</p>}
                </article>

                <article className="input-group">
                    <input type="submit" value="Log In" />
                </article>
            </form>
        </section>
    );
}

export default Login;