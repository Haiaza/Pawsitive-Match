// import req from 'express/lib/request';
import req from 'express/lib/request';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
    return (
        <>
        { user ? (
            <nav>
                <ul>
                    <li><Link to="/profiles/">Home</Link></li>
                    <li><Link to="">Sign Out</Link></li>
                </ul>
            </nav>
        ) :
        user && req.params.signin === 'signin' ? (
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
