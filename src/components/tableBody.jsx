import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Link } from "react-router-dom";
// import UserPage from "./userPage";

const TableBody = ({ data, columns }) => {
    // console.log(data);
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            // console.log("component", component);
            return component;
        }
        // console.log({ item });
        // console.log(columns[column].path);
        return _.get(item, columns[column].path);
    };
    // console.log({ data });
    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) =>
                        column === "name" ? (
                            <td key={column}>
                                <Link to={`/users/${item._id}`}>
                                    {item.name}
                                </Link>
                            </td>
                        ) : (
                            <td key={column}>{renderContent(item, column)}</td>
                        )
                    )}
                </tr>
            ))}
        </tbody>
    );
};
TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};
export default TableBody;
