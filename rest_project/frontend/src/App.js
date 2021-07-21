import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User';
import FooterPage from './components/footer';
import MenuPage from './components/menu';


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        'users': []
      }
    }

    componentDidMount() { 
      axios.get('http://localhost:8000/api/users/')
        .then(
          response => {
              const users = response.data
              this.setState({
                'users': users 
              })
          }
      ).catch(error => console.log(error))
    }

      render () {
        return (
          <div>
            < MenuPage />
            < UserList users={this.state.users} />
            < FooterPage />
          </div>
        )
      }
  }  

export default App;
