import React from "react";
import API from "../api";

const Qualitie = ({_id, color, name}) => (
     <td key={_id} className = {`badge bg-${color} m-2`}> {name} </td> 
)

export default Qualitie