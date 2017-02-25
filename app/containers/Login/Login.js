/* @flow */
/* eslint jsx-a11y/href-no-hash: 'off' */

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
 * Container for Login / User Creation Form
 * Parent component: N/A
 * Child component: N/A
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

  /**
   * Makes call to either create or login a user based on the input form.
   */
  handleFormSubmit = (event: any) => {
    const {
      firstName,
      lastName,
      email,
      password,
      login,
    } = this.state;
    event.preventDefault();
    if (password.length > 6) {
      if (login) {
        Axios.post('http://localhost:8080/login',
          { email, password },
          { withCredentials: true })
          .then(() => {
            window.location = '/';
          })
          .catch(() => {
            // handle errors here for invalid login.
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
  }

  /**
  * Toggle the view to switch between login and user creation
  */
  handleToggle = () => {
    this.setState({
      login: !this.state.login,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
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
        {login ?
          <h1>TodoApp Login</h1>
          :
          <h1>User Signup</h1>
        }
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
              <p>Not registered? <a href="#" onClick={this.handleToggle}>Create an account</a></p>
            </div>
            :
            <div>
              <button action="submit">Create New User</button>
              <p>Already registered? <a href="#" onClick={this.handleToggle}>Sign in</a></p>
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
