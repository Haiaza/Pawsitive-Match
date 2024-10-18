import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {

    const userId = user ? user._id : null;

    const location = useLocation()

    
    if (location.pathname === '/signup') {
        return null
    }
    return (
        <>
        { user ? (
                
            <nav>
                <ul>
                    <li><Link to="/dash">Dashboard</Link></li>
                    <li><Link to="">Sign Out</Link></li>
                    <li><Link to={`/profiles/${userId}`}>My Pets</Link></li> 
                </ul>
            </nav>
        ) :
        location.pathname === '/signin' ? ( 
            <nav>
                <ul>
                    <li><Link to="/dash">Dashboard</Link></li>
                </ul>
            </nav>
        ) :
        (
            <nav>
                <ul>
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/dash">Dashboard</Link></li>
                </ul>
            </nav>
        )}
        </>
    )
}

export default Navbar;
