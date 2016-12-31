
import React, { Component } from 'react';

export default class ResetButton extends React.Component {

  render() {
    const {resetApp} = this.props;

    return (
      <div>
        <button className="reset-app"
          onClick={resetApp.bind(null) }>reset</button>
      </div>
    );
  }
}

