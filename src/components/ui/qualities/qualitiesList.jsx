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
                <Quality {...qual} _id={qual} key={qual} />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array,
    id: PropTypes.array
};
export default QualitiesList;
