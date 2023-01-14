import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, onToggleBookMark, id }) => {
    const getBadgeClasses = () => {
        let classes = "bi bi-bookmark";
        classes += status === false ? "" : "-heart-fill";
        return classes;
    };

    return (
        <button
            type="button"
            className={getBadgeClasses()}
            onClick={() => onToggleBookMark(id)}
        ></button>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default BookMark;
