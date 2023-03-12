import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../api";
import { timeStamp } from "../../util/timestamp";

const Comment = ({ onRemove, _id: id, userId, created_at: time, content }) => {
    // console.log("comments", comments);
    // console.log("userId", userId);
    // console.log("onRemove", onRemove);

    const [user, setUser] = useState();
    // const [load, setLoad] = useState(false);

    // console.log("user", user);
    // console.log("load", load);

    // useEffect(() => {
    //     setLoad(true);
    //     API.users.getById(userId).then((item) => {
    //         setUser(item);
    //         setLoad(false);
    //     });
    // }, []);

    useEffect(() => {
        API.users.getById(userId).then((item) => {
            setUser(item);
        });
    }, []);

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                {user ? (
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
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
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onRemove(id)}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    "Loading..."
                )}
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
