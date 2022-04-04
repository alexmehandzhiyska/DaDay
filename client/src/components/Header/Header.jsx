import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Header = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <header className="flex justify-between items-center pr-16 text-2xl">
            <Link to={user ? "/share-day" : "/login"}><img src="https://res.cloudinary.com/drinka/image/upload/v1648939195/da-day/logo_jh3ae7.png" alt="DaDay logo" className="w-20 h-20" /></Link>

            <nav>
                {!user && 
                    <ul className="flex py-4">
                        <li className="px-5 nav-link"><Link to='/register'>Register</Link></li>
                        <li className="px-5 nav-link"><Link to='/login'>Login</Link></li>
                    </ul>
                }

                {user && 
                    <ul className="flex py-4">
                        <li className="px-5 nav-link"><Link to={`/notes/${user.user_id}`}>Notes</Link></li>
                        <li className="px-5 nav-link" onClick={logout}>Log out</li>
                    </ul>
                }
            </nav>
        </header>
    );
}

export default Header;