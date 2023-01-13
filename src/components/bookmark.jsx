import React from "react";

const BookMark = ({status, onToggleBookMark, id}) => {
    
    // console.log("status", ...rest);
    let getBadgeClasses = () => {
        let classes = 'bi bi-bookmark'
        classes += status === false  ? '' : '-heart-fill'
        return classes
        }


    return  <button key = {id} type="button" className={getBadgeClasses()}  onClick={() => onToggleBookMark(id)}></button>
    
}

export default BookMark
