/* @flow */

import React from 'react';
import Axios from 'axios';

type Props = {};

type State = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  login: boolean,
  error: boolean,
};

/**
 * Container for Login System
 * Parent component: N/A
 */
export default class Login extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      login: true,
      error: false,
    };
  }

  state: State;

  props: Props;

  handleChange = (event: any) => {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleFormSubmit = (event: any) => {
    const {
      firstName,
      lastName,
      email,
      password,
      login,
    } = this.state;
    event.preventDefault();
    if (login) {
      Axios.post('http://localhost:8080/authenticate',
        { email, password },
        { withCredentials: true })
        .then(() => {
          window.location = '/';
        })
        .catch(() => {
          this.setState({
            error: true,
          });
        });
    } else {
      Axios.post('http://localhost:8080/create',
        { email, password, firstName, lastName },
        { withCredentials: true })
        .then(() => {
          window.location = '/';
        })
        .catch(() => {
          // handle errors here such as cases where a user can't be created
          // due to conflicting emails
          this.setState({
            error: true,
          });
        });
    }
  }

  handleToggle = () => {
    this.setState({
      login: !this.state.login,
    });
  }

  render() {
    const {
      login,
      email,
      firstName,
      lastName,
      password,
      error,
    } = this.state;
    return (
      <div className="login-component">
        <form onSubmit={this.handleFormSubmit}>
          {login ?
            null
            :
            <div>
              <input
                type="text"
                value={firstName}
                name="firstName"
                placeholder="first name"
                onChange={this.handleChange}
              />
              <input
                type="text"
                value={lastName}
                name="lastName"
                placeholder="last name"
                onChange={this.handleChange}
              />
            </div>
          }
          <input
            type="email"
            value={email}
            name="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            value={password}
            name="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          {login ?
            <div>
              <button action="submit">Login</button>
              <p>Not registered? <a onClick={this.handleToggle}>Create an account</a></p>
            </div>
            :
            <div>
              <button action="submit">Create New User</button>
              <p>Already registered? <a onClick={this.handleToggle}>Sign in</a></p>
            </div>
          }
          {error ?
            <p className="error">Error logging in. email / password combination isn&apos;t correct</p>
            :
            null
          }
        </form>
      </div>
    );
  }

}
