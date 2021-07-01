import React from 'react';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
         Q: {this.props.question}
      </div>
    )
  }
}
