import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = (props) => {
    const {
        name,
        _id,
        bookmark,
        rate,
        qualities,
        profession,
        completedMeetings,
        onToggleBookMark,
        onDelete
    } = props;
    return (
        <>
            <tr key={_id}>
                <td>{name}</td>
                <td>
                    {qualities.map((qual) => (
                        <Qualitie {...qual} key={qual._id} />
                    ))}
                </td>
                <td className={profession._id}>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}/5</td>
                <td>
                    <BookMark
                        status={bookmark}
                        onToggleBookMark={onToggleBookMark}
                        id={_id}
                    />
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onDelete(_id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </>
    );
};
User.propTypes = {
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool.isRequired,
    rate: PropTypes.number.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default User;
