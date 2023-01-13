import React from "react";

const BookMark = ({status, ...rest}) => {
    
    // console.log("status", ...rest);
    let getBadgeClasses = () => {
        let classes = 'bi bi-bookmark'
        classes += status === false  ? '' : '-heart-fill'
        return classes
        }


    return  <button type="button" className={getBadgeClasses()}></button>
    
}

export default BookMark
