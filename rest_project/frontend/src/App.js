import React from 'react';
import axios from 'axios';
import {BrowserRouter, HashRouter, Route, Redirect, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User';
import ProjectList from './components/Project';
import TodoList from './components/Todo';

// import FooterPage from './components/footer';
// import MenuPage from './components/menu';


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        'users': [],
        'projects': [],
        'todos': []
      }
    }

  componentDidMount() { 
    axios.get('http://localhost:8000/api/users/')
      .then(
        response => {
            const users = response.data.results
            this.setState({
              'users': users 
            })
        }
    ).catch(error => console.log(error))


    axios.get('http://localhost:8000/api/projects/')
    .then(
      response => {
          const projects = response.data.results
          this.setState({
            'projects': projects 
          })
      }
    ).catch(error => console.log(error))


    axios.get('http://localhost:8000/api/todos/')
    .then(
      response => {
          const todos = response.data.results
          this.setState({
            'todos': todos 
          })
      }
    ).catch(error => console.log(error))
  }

    render() {
      return (
        <div>
          {/* <MenuPage/> */}
          <HashRouter>
            <Switch>
              <Route exact path='/' component={() => < UserList users={this.state.users} />}/>
              <Redirect from='/users' to='/' />
              <Route exact path='/projects' component={() => < ProjectList projects={this.state.projects} />}/>
              <Route exact path='/todos' component={() => < TodoList todos={this.state.todos} />}/>
            </Switch>
          </HashRouter>
          {/* < FooterPage /> */}
        </div>
      )
    }
}  

export default App;
