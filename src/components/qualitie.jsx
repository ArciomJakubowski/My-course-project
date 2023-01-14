import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ _id, color, name }) => (
    <td key={_id} className={`badge bg-${color} m-2`}>
        {" "}
        {name}{" "}
    </td>
);
Qualitie.propTypes = {
    _id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Qualitie;
