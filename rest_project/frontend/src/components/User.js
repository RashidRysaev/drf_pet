import React from 'react';


// sole User we are gonna provide to UserList 
const UserItem = ({user}) => {
    return (
        <tr> 
            <td>
                {user.username} 
            </td>
            <td>
                {user.firstName} 
            </td>
            <td> 
                {user.lastName}
            </td> 
            <td>
                {user.email} 
            </td>
            <td>
                {String(user.isSuperuser)} 
            </td>
        </tr>
    )
}


// the UserList we are gonna use in App.js
const UserList = ({users}) => {
    return (
        <table>
            <th>
               Username:
            </th>
            <th>
               First name:
            </th>
            <th>
               Last name:
            </th>
            <th>
               Email:
            </th>
            <th>
               User is superuser:
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}

export default UserList;
