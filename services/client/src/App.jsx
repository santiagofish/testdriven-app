import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';

import UsersList from './components/UsersList';
import About from './components/About';
import NavBar from './components/NavBar';
import Form from './components/forms/Form';
import Logout from './components/Logout';
import UserStatus from './components/UserStatus';
import Message from './components/Message';


class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      title: 'TestDriven.io',
      isAuthenticated: false,
      messageName: null,
      messageType: null
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    // this.addUser = this.addUser.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.checkAuthStatus = this.checkAuthStatus.bind(this);
  };

// refactor! Put 'things that do not produce side-effects' in constructor-^,
// and things that DO do side-effects in componentDidMount
  componentWillMount() {
    // console.log("auth status: ", this.state.isAuthenticated);
    if (window.localStorage.getItem('authToken')) {
      this.setState({ isAuthenticated: true });
    };
  };

  componentDidMount() {
    // is this still necessary?
    if (window.localStorage.getItem('authToken')) {
      this.setState({ isAuthenticated: true });
    };
    this.getUsers();
  };

  getUsers() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
         .then((res) => { this.setState({ users: res.data.data.users }); })
         .catch((err) => { console.log(err) } );
  };

  addUser(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email
    };
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
         .then((res) => {
           this.getUsers();
           this.setState({ username: '', email: ''});
         })
         .catch((err) => { console.log(err) });
  };
 // arrow functions seem to eliminate need for this.handlechange above??
  // handleChange(event) {
  //   const obj = {};
  //   obj[event.target.name] = event.target.value;
  //   this.setState(obj);
  // };

  logoutUser() {
    window.localStorage.clear();
    this.setState({ isAuthenticated: false });
  };

  loginUser(token) {
    window.localStorage.setItem('authToken', token);
    this.setState({ isAuthenticated: true });
    this.getUsers();
    this.createMessage('Welcome!', 'success');
  };

  createMessage(name='Sanity Check', type='success') {
    this.setState({
      messageName: name,
      messageType: type
    });
    setTimeout(() => {
      this.removeMessage();
    }, 3000);
  };

  removeMessage() {
    this.setState({
      messageName: null,
      messageType: null
    });
  };

  render() {
    return (
      <div>
        <NavBar
          title={this.state.title}
          isAuthenticated={this.state.isAuthenticated}
        />
        <section className="section">
          <div className="container">
            {this.state.messageName && this.state.messageType &&
              <Message
                messageName={this.state.messageName}
                messageType={this.state.messageType}
                removeMessage={this.removeMessage}
              />
            }
            <div className="columns">
              <div className="column is-half">
                <br/>
                <Switch>
                  <Route exact path='/' render={() => (
                    <UsersList
                      users={this.state.users}
                    />
                  )} />
                  <Route exact path='/about' component={About}/>
                  <Route exact path='/register' render={() => (
                    <Form
                      formType={'Register'}
                      isAuthenticated={this.state.isAuthenticated}
                      loginUser={this.loginUser}
                      createMessage={this.createMessage}
                    />
                  )} />
                  <Route exact path='/login' render={() => (
                    <Form
                      formType={'Login'}
                      isAuthenticated={this.state.isAuthenticated}
                      loginUser={this.loginUser}
                      createMessage={this.createMessage}
                    />
                  )} />
                  <Route exact path='/logout' render={() => (
                    <Logout
                      isAuthenticated={this.state.isAuthenticated}
                      logoutUser={this.logoutUser}
                    />
                  )} />
                  <Route exact path='/status' render={() => (
                    <UserStatus
                      isAuthenticated={this.state.isAuthenticated}
                    />
                  )} />
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  };
};

export default App;
