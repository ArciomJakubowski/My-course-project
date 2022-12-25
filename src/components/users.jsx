import React, { useState } from "react";
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll);
    const handleDelete = (userId) => {setUsers(prevState => prevState.filter(user => user !== userId))}
    // console.log(users.length);

    const renderPhrase = (number) => { 
        let array1 = [1, 5, 6 , 7, 8, 9, 10, 11, 12, 13, 14]
        let array2 = [2, 3, 4, 22, 23, 24, 32, 33, 34]
        let words = ['человек', 'человека']

        let getBadgeClasses = () => {
            let classes = 'badge m-2 '
            classes += users.length === 0 ? 'bg-danger' : 'bg-primary'
            return classes
            }

        if(users.length) {
            <div>table</div> 
        }
        
        if(array1.includes(number)) {
            return <h1 className={getBadgeClasses()}>{number} {words[0]} тусанет с тобой сегодня</h1>
        }
        
        if(array2.includes(number)) {
           return  <h1 className={getBadgeClasses()}>{number} {words[1]} тусанет с тобой сегодня</h1>
        }

        if(number===0) {
            return (
            <h1 className={getBadgeClasses()}> Никто с тобой не тусанет</h1>
            )
        }        
    }

    return (<>
    <div>{renderPhrase(users.length)}</div>

    <table className="table table-striped">
  <thead>
  {
  users.length > 0 &&
    <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
    </tr>
    }
  </thead>
  <tbody>
  {
    users.map((user) => {
        // console.log('profession', user.profession.name)
        // console.log(users.length)
        // console.log('qulities', user.qualities.reduce((acc, qulity) => [acc, qulity]))
      return (
        <tr>
           <td>{user.name}</td> 
           <td>{user.qualities.reduce((acc, {name, color, _id}) => [acc, <td key = {_id} className={`badge bg-${color} m-2`}>{name}</td> ], [])}</td>
           <td className={user.profession._id}>{user.profession.name}</td> 
           <td>{user.completedMeetings}</td>
           <td>{user.rate}/5</td>
           <td><button type="button" className = "btn btn-danger" onClick={() => handleDelete(user)}>Delete</button></td>
        </tr>
      ) 
    })
  }
  </tbody>
</table>
</>)
}

export default Users
