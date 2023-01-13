import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import API from "./api";




function App () {
    const [users, setUsers] = useState(API.users.fetchAll)

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId))
      
    }
    const handleToggleBookMark = (id) => {
        setUsers((prevState) => prevState.map((user) => user._id === id ? [{...user, bookmark: 'true'}] : {...user}))
    }

    
    
    return (
        
        <>
            <SearchStatus arrayLength = {users.length}/>
            <Users  users={users} onDelete = {handleDelete} onToggleBookMark = {handleToggleBookMark}/>
        </>
        
    )
}

export default App



// (user.bookmark = !user.bookmark)