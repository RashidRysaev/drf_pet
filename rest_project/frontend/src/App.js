import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User';


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        'users': []
      }
    }

    componentDidMount() {
      const users = [
        {
          "username": "username",
          "first_name": "first_name_user",
          "last_name": "last_name_user",
          "email": "user@usermail.com",
          "is_superuser": false
        },
      ]
      this.setState(
        {
          'users':users
        }
      )
    }

      render () {
        return (
          <div>
            < UserList users={this.state.users} />
          </div>
        )
      }
  }  

export default App;



