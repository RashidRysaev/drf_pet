import React from 'react';
import axios from 'axios';
import { BrowserRouter, HashRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User';
import ProjectList from './components/Project';
import TodoList from './components/Todo';
import LoginForm from './components/Auth';

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

  get_token(login, password) { 
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: login, password: password}) 
    .then(
      response => {
        console.log(response.data)
      }
    ).catch(error => alert('Неверный логин или пароль'))
  }

    render() {
      return (
        <div>
          {/* <MenuPage/> */}
          <HashRouter>
            <nav>
              <ul>
                <li>
                  <Link to='/'>Users</Link>
                </li>
                <li>
                  <Link to='/projects'>Projects</Link>
                </li>
                <li>
                  <Link to='/todos'>Todos</Link>
                </li>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route exact path='/' component={() => < UserList users={this.state.users} />}/>
              <Redirect from='/users' to='/' />
              <Route exact path='/projects' component={() => < ProjectList projects={this.state.projects} />}/>
              <Route exact path='/todos' component={() => < TodoList todos={this.state.todos} />}/>
              <Route exact path='/login' component={() => <LoginForm get_token={(login, password) => this.get_token(login, password)} />} />
            </Switch>
          </HashRouter>
          {/* < FooterPage /> */}
        </div>
      )
    }
}  

export default App;
