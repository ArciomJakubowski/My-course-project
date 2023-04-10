import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQuality";

const Quality = ({ _id }) => {
    // const quls = useQualities()
    // console.log("quls", quls);

    const { name, color } = useQualities().getQuality(_id);

    // console.log("name", name);
    // console.log("color", color);

    return (
        <span key={_id} className={"badge m-1 bg-" + color}>
            {name}
        </span>
    );
};
Quality.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string
};

export default Quality;
