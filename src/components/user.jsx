import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import API from "../api";


const User = (props) => {
   let {name, _id, bookmark, rate, qualities, profession, completedMeetings, onToggleBookMark, onDelete} = props
      return (
        <>
        <tr key = {_id}>
           <td>{name}</td>
           <td>{qualities.map((qual) => ( <Qualitie {...qual} /> ))}</td>
           <td className={profession._id}>{profession.name}</td> 
           <td>{completedMeetings}</td>
           <td>{rate}/5</td>
           <td><BookMark status = {bookmark} onClick={() => onToggleBookMark(_id)} /></td>
           <td><button type="button" className = "btn btn-danger" onClick={() => onDelete(_id)}>Delete</button></td>
        </tr>
        </>
      ) 
}

export default User


