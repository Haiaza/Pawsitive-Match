import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signOut } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, setMyUser }) => {

    const userId = user ? user._id : null;
    const navigate = useNavigate()

    const handleSignOut = () => {

            if (signOut()) {
                console.log('User signed out successfully');
                setMyUser(null)
                navigate('/login')
                
            } else {
                console.log('Sign-out failed');
            }
        }

    const location = useLocation()

    
    if (location.pathname === '/signup') {
        return null
    }
    return (
        <>
        { user ? (
                
            <nav className='navbar  bg-body-tertiary'>
                <ul className='navbar-nav'>
                    <div className="container-fluid">
                        <Link className='navbar-brand' to="/dash">Pawsitive Match</Link>
                        <li className='nav-item'>
                            <Link className='nav-link'to='/signin' onClick={handleSignOut} >Sign Out</Link></li>
                        <li className='nav-item'>
                            <Link className='nav-link'to={`/profiles/${userId}`}>My Pets</Link></li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/pets/submit" >Add to the Sancutuary</Link>
                        </li>
                    </div>
                </ul>
            </nav>
        ) :
        location.pathname === '/signin' ? ( 
            <nav className='navbar  bg-body-tertiary'>
                <ul className='navbar-nav'>
                    <li className='nav-item'><Link className='nav-link' to="/dash">Dashboard</Link></li>
                </ul>
            </nav>
        ) :
        (
            <nav className='navbar  bg-body-tertiary'>
                <ul className='navbar-nav'>
                    <li className='nav-item'><Link className='nav-link' to="/signin">Sign In</Link></li>
                    <li className='nav-item'><Link className='nav-link' to="/dash">Dashboard</Link></li>
                </ul>
            </nav>
        )}
        </>
    )
}

export default Navbar;
