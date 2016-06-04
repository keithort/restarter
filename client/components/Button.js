import React from 'react'

export default class Button extends React.Component {
  constructor() {
    super();
    this.state = {
      liked: 'false'
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({liked: 'blah'});
  }
  render() {
    // const text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <button onClick={this.handleClick}>
        {/*You {text} this. Click to toggle.*/}
        {this.state.liked}
      </button>
    );
  }
}
