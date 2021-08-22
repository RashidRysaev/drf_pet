import React from 'react';
import { Link } from 'react-router-dom';


// sole Project we are gonna provide to ProjectList 
const ProjectItem = ({project, deleteProject}) => {
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
            <td> 
                <button onClick={ ()=>deleteProject(project.id) } type='button'>Delete</button>
            </td>
        </tr>
    )
}


// the ProjectList we are gonna use in App.js
const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
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
                <th></th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
            </table>
            <Link to='/projects/create'>Create new project</Link>
        </div>
    )
}

export default ProjectList;
