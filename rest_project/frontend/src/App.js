import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
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
        'todos': [],
        'token': '',
      }
    }


  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data())
  }


  is_authenticated() {
    return !!this.state.token
  }


  logout() { 
    this.set_token('')
  }


  get_token(login, password) { 
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: login, password: password}) 
    .then(
      response => {
        this.set_token(response.data['token'])
      }
    ).catch(error => alert('Неверный логин или пароль'))
  }


  get_token_from_storage() {
    const cookies = new Cookies() 
    const token = cookies.get('token') 
    this.setState({'token': token}, ()=>this.load_data())
  }


  get_headers() { 
    let headers = {
      'Content-Type': 'application/json' 
    }
  if (this.is_authenticated()) 
    {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers 
  }


  load_data() {

    const headers = this.get_headers()

    axios.get('http://localhost:8000/api/users/', {headers})
    .then(
      response => {
          const users = response.data.results
          this.setState({
            'users': users 
          })
      }
    ).catch(
      error => {
          this.setState({
              'users': []
          })
          console.log(error)
      }
  )


    axios.get('http://localhost:8000/api/projects/', {headers})
    .then(
      response => {
          const projects = response.data.results
          this.setState({
            'projects': projects 
          })
        }
      ).catch(
        error => {
            this.setState({
                'projects': []
            })
            console.log(error)
        }
    )


    axios.get('http://localhost:8000/api/todos/', {headers})
    .then(
      response => {
          const todos = response.data.results
          this.setState({
            'todos': todos 
          })
        }
      ).catch(
        error => {
            this.setState({
                'todos': []
            })
            console.log(error)
        }
    )

  }


  componentDidMount() { 
    this.get_token_from_storage()
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
                {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
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
