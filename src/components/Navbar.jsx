import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {

    const { param } = useParams()
    const location = useLocation()

    
    if (location.pathname === '/signup') {
        return null
    }
    return (
        <>
        { user ? (
                /**Check if the My Pets looks/acts as expected with internet */
            <nav>
                <ul>
                    <li><Link to="/profiles/">Home</Link></li>
                    <li><Link to="">Sign Out</Link></li>
                    <li><Link to="/profiles/:userId/pets">My Pets</Link></li> 
                </ul>
            </nav>
        ) :
        param === 'signin' ? ( /**CHECK IF THIS WORKS AS EXPECTED WITH INTERNET */
            <nav>
                <ul>
                    <li>NOTHING</li>
                    <li><Link to="/testing">Dashboard</Link></li>
                </ul>
            </nav>
        ) :
        (
            <nav>
                <ul>
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/testing">Dashboard</Link></li>
                </ul>
            </nav>
        )}
        </>
    )
}

export default Navbar;
