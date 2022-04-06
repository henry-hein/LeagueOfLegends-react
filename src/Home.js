import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

const Champ = (props) => {
  const {
    name,
    id,
    title,
    tags,
    stats,
  } = props.champ;

  return (
    <div className="champ-container">
        <Link to={`champ/${id}/`}>
        <img src={"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + id + "_0.jpg"}></img>
          <h4>Name: {name}</h4>
          <h5>Title: {title}</h5>
          <h5>{tags[0]}</h5>
          <h5>{tags[1]}</h5>
          <h5>Stats: {stats.armor}</h5>
          <h5>{stats.attackdamage}</h5>
          <h5>{stats.hp}</h5>
        </Link>
    </div>
  )
}

class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      error: '',
    };

  }

  componentDidMount() {
    fetch("http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json")
    .then(checkStatus)
    .then(json)
    .then((data) => {
        this.setState({ results: Object.values(data.data), error: ''});
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  render() {
    const { results } = this.state;
    return (
      <>
        {(() => {
          return results.map((champ) => {
            return <Champ key={champ.id} champ={champ} />;
          })
        })()}
      </>
      // <>
      //   {results.map((key) =>  <img src={"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + key + "_0.jpg"}></img>)}
      // </>
    )
  }
}

export default Champion;