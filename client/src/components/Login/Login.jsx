import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { authService } from "../../services/authService";

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });
    const navigate = useNavigate();

    const loginUser = (data) => {
        authService.login(data)
            .then(() => {
                navigate('/share-day');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <section className="flex flex-col items-center">
            <h1 className="title">Log In</h1>

            <form onSubmit={handleSubmit(loginUser)}>
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