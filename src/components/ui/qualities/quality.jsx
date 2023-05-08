import React from "react";
import PropTypes from "prop-types";
// import { useQualities } from "../../../hooks/useQuality";

const Quality = ({ _id, name, color }) => {
    // const quls = useQualities()
    // const { name, color } = useQualities().getQuality(_id);

    return (
        <span key={_id} className={"badge m-1 bg-" + color}>
            {name}
        </span>
    );
};
Quality.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string.isRequired
};

export default Quality;
