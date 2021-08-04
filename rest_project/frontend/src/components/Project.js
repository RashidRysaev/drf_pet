import React from 'react';
import { Link } from 'react-router-dom';


// sole Project we are gonna provide to ProjectList 
const ProjectItem = ({project}) => {
    return (
        <tr> 
            <td>
                {project.title} 
            </td>
            <td>
                {project.urlLink} 
            </td>
            <td> 
                {project.users}
            </td>
        </tr>
    )
}


// the ProjectList we are gonna use in App.js
const ProjectList = ({projects}) => {
    return (
        <table>
            <th>
               Title:
            </th>
            <th>
               URL:
            </th>
            <th>
               User:
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList;
