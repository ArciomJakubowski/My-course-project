import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import { getCurrentUserData } from "../../store/users";
import { useSelector } from "react-redux";

const NavProfile = () => {
    // const { currentUser } = useAuth();

    const currentUser = useSelector(getCurrentUserData());
    console.log(currentUser);
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    // console.log("render user bar");
    if (!currentUser) return "Loading";
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser?.image}
                    alt=""
                    className="img-responsive rounded-circle"
                    height="40"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? "show" : "")}>
                <Link
                    to={`/users/${currentUser._id}`}
                    className="dropdown-item"
                >
                    Profile
                </Link>
                <Link to="/logout" className="dropdown-item">
                    Log Out
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
