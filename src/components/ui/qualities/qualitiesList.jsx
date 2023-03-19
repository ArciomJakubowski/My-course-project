import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) return "Loading";
    return (
        <>
            {qualities.map((qual) => (
                <Quality {...qual} _id={qual} key={qual._id} />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired,
    id: PropTypes.array.isRequired
};
export default QualitiesList;
