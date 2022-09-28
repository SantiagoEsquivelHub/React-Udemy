import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/context';
import { types } from '../../auth/types/types';

export const Navbar = ({ name, handleLogout }) => {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const onLogout = () => {

        /*
        replace= Avoid going back to the previous page
        */
       
        logout();

        navigate('/login', {
            replace: true
        })
    }


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">

            <Link
                className="navbar-brand"
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">

                    <span className="nav-item nav-link text-info">
                        {user?.name}
                    </span>

                    <button
                        className="nav-item nav-link btn"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}
