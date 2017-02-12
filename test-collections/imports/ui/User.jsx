import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// User component - represents a single todo item
export default class User extends Component {

  deleteThisUser() {
    Meteor.call('users.remove', this.props.user._id);
  }

  render() {
    console.log(this.props.user);
    return (
      <li>
        <button className="delete" onClick={this.deleteThisUser.bind(this)}>
          &times;
        </button>

        <span className="text">
          <strong>{this.props.user.username}</strong>: {this.props.user.calling}
        </span>
      </li>
    );
  }
}

User.propTypes = {
  // This component gets the user to display through a React prop.
  // We can use propTypes to indicate it is required
  user: PropTypes.object.isRequired,
};
