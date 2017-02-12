import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Users } from '../api/users.js';

import User from './User.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderNames  = this.renderNames.bind(this);
    this.printTest = this.printTest.bind(this);

  }

  handleSubmit(event) {
    console.log("handleSubmit clicked");
    event.preventDefault();

    //Grab text field by the "ref" attribute of the input
    const userName = ReactDOM.findDOMNode(this.refs.userInput).value.trim();

    Meteor.call('users.insert', userName);

    // Clear form
    ReactDOM.findDOMNode(this.refs.userInput).value = '';
  }

  renderNames() {
    let users = this.props.users;
    console.log("App renderNames");
    console.log(users);
    return users.map((user) => {
      const userId = user._id;

      return (
        <User
          key={user._id}
          user={user}
        />
      );
    });
  }

  render() {
    console.log("render");
    console.log(this);
    return (
      <div className="container">
        <header>
            <h1>Test Collections</h1>

            <form className="new-user" onSubmit={this.handleSubmit} >
              <input
                type="text"
                ref="userInput"
                placeholder="Type to add new user"
              />
            </form>
        </header>

        <ul> { this.renderNames() } </ul>

      </div>
    );
  }
}

App.propTypes = {
  users: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('users');
  return {
    users: Users.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
