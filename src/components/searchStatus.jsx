import React from "react";


const SearchStatus = ({arrayLength}) => { 

    console.log("arrayLength", arrayLength);

    let array1 = [1, 5, 6 , 7, 8, 9, 10, 11, 12, 13, 14]
    let array2 = [2, 3, 4, 22, 23, 24, 32, 33, 34]
    let words = ['человек', 'человека']

    let getBadgeClasses = () => {
        let classes = 'badge m-2 '
        classes += arrayLength === 0 ? 'bg-danger' : 'bg-primary'
        return classes
        }
    
    if(array1.includes(arrayLength)) {
        return <h1 className={getBadgeClasses()}>{arrayLength} {words[0]} тусанет с тобой сегодня</h1>
    }
    
    if(array2.includes(arrayLength)) {
       return  <h1 className={getBadgeClasses()}>{arrayLength} {words[1]} тусанет с тобой сегодня</h1>
    }

    if(arrayLength===0) {
        return (
        <h1 className={getBadgeClasses()}> Никто с тобой не тусанет</h1>
        )
    }        

    return 
}

export default SearchStatus


