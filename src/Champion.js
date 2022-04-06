import React from 'react';
import {json, checkStatus } from './utils';

class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      champ: null,
    };
  }

  componentDidMount() {
    fetch(`https://restcountries.com/v2/alpha/${this.props.match.params.id}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
        console.log(data);
        this.setState({ champ: data, error: ''});
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  render () {
    return (
      <div>hello</div>
    )
  }
}

export default Champion;
