import { NavLink } from "react-router-dom";

export const NavBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">useContext</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <NavLink
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                to="/"
                                end
                            >
                                Home
                            </NavLink>

                            <NavLink
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                to="/about"
                            >
                                About
                            </NavLink>

                            <NavLink
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                to="/login"
                            >
                                Login
                            </NavLink>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
