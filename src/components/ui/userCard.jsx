import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const UserCard = ({ items }) => {
    const history = useHistory();

    // const { currentUser } = useAuth();

    // const currentUser = useSelector(getCurrentUserData());
    const currentUserId = useSelector(getCurrentUserId());

    const handleOpenFormUser = () => {
        history.push(`/users/${items._id}/edit`);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUserId === items._id && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleOpenFormUser}
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                )}

                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={items.image}
                        // src={`https://avatars.dicebear.com/api/avataaars/${(
                        //     Math.random() + 1
                        // )
                        //     .toString(36)
                        //     .substring(7)}.svg`}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="65"
                        height="65"
                    />
                    <div className="mt-3">
                        <h4>{items.name}</h4>
                        <p className="text-secondary mb-1">
                            {items.profession.name}
                        </p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            ></i>
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            ></i>
                            <span className="ms-2">{items.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    items: PropTypes.object
};

export default UserCard;
