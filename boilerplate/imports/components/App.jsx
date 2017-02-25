import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { SampleCollections } from '../collections/SampleCollections.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("initial sampleCollections in props");
    console.log(this.props.sampleCollections);
  }

  addSample() {
    Meteor.call('sampleCollections.insert', "HARDCODED SAMPLE TEXT");
    console.log("updated sampleCollections in props");
    console.log(this.props.sampleCollections);
  }

  render() {
    return (
      <div className="container">
        <header>
            <h1>Welcome to the Boilerplate</h1>
        </header>
        <button onClick={this.addSample.bind(this)}>Click me to add a SampleCollection</button>
      </div>
    );
  }
}

App.propTypes = {
  sampleCollections: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('sampleCollections');
  return {
    sampleCollections: SampleCollections.find({}).fetch(),
  };
}, App);
