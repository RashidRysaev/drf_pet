import React from 'react';


// sole Todo we are gonna provide to TodoList 
const TodoItem = ({todo}) => {
    return (
        <tr> 
            <td>
                {todo.project.title} 
            </td>
            <td>
                {todo.user.username} 
            </td>
            <td> 
                {todo.content}
            </td>
            <td> 
                {String(todo.isActive)}
            </td>
        </tr>
    )
}


// the TodoList we are gonna use in App.js
const TodoList = ({todos}) => {
    return (
        <table>
            <th>
               Project:
            </th>
            <th>
               User:
            </th>
            <th>
               Content:
            </th>
            <th>
               Active:
            </th>
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}

export default TodoList;