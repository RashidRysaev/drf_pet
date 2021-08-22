import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: '', users: []}
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'users' : []
            })
            return;
        }
        let users = []
        for(let i=0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'users' : users
        })
    }

    handleSubmit(event) { 
        this.props.createProject(this.state.title, this.state.users);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div>
                    <label for="title">Title</label>
                    <input type="text" name="title" value={this.state.title} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div>
                    <label for="users">User</label>
                    <select multiple name="users" onChange={(event)=>this.handleUserChange(event)} >
                        {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm;
