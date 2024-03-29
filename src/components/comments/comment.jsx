import React from "react";
import PropTypes from "prop-types";
// import API from "../../api";
import { timeStamp } from "../../util/timestamp";
// import { useUser } from "../../hooks/useUsers";
// import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../store/users";

const Comment = ({ onRemove, _id: id, userId, created_at: time, content }) => {
    // const [user, setUser] = useState();
    // const { getUserById } = useUser();
    // const { currentUser } = useAuth();
    console.log({ id });
    console.log({ userId });
    const currentUserId = useSelector(getCurrentUserId());

    // const user = getUserById(userId);
    const user = useSelector(getUserById(userId));

    // const [load, setLoad] = useState(false);

    // useEffect(() => {
    //     setLoad(true);
    //     API.users.getById(userId).then((item) => {
    //         setUser(item);
    //         setLoad(false);
    //     });
    // }, []);

    // useEffect(() => {
    //     API.users.getById(userId).then((item) => {
    //         setUser(item);
    //     });
    // }, []);

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={user?.image}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user && user.name}
                                        <span className="small">
                                            - {timeStamp(time)}
                                        </span>
                                    </p>
                                    {/* {currentUser._id === userId && ( */}
                                    {currentUserId === userId && (
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => {
                                                return onRemove(id);
                                            }}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    onRemove: PropTypes.func,
    _id: PropTypes.string,
    userId: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    content: PropTypes.string
};

export default Comment;
