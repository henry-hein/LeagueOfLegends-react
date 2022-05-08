import React from 'react';
import {json, checkStatus } from './utils';

const ChampFacts = (props) => {
  const {
    name,
    id,
    title,
    tags,
    stats,
    lore,
    passive,
    skins,
    spells,
  } = props.champion;

  return (
    <div className="champ-card">
      <div className="champ-info">
        <h3 className="champ-name">{name}</h3>
        <h4 className="champ-title">{title}</h4>
        <ul className="champ-stats">
          <li className="champ-stat">{stats.armor}</li>
          <li className="champ-stat">{stats.attackdamage}</li>
          <li className="champ-stat">{stats.hp}</li>
          <li className="champ-stat">{stats.movespeed}</li>
          <li className="champ-stat"></li>
        </ul>
        <ul className="champ-roles">
          <li>Role:</li>
          <li className="champ-role">{tags[0]}</li>
        </ul>
      <ul>
        <li>
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/passive/${passive.image.full}`}></img>

        </li>
      {(() => {
          return spells.map((spell) => {
            return (
                <li key={spell.id}>
                  <img src={`https://ddragon.leagueoflegends.com/cdn/12.8.1/img/spell/${spell.image.full}`}></img>
                </li> 
            );
          })
        })()}
      </ul>
      </div>
    </div>
  )
}

class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      champ: [],
    };
  }

  componentDidMount() {
    fetch(`http://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/champion/${this.props.match.params.id}.json`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
        console.log(data.data);
        this.setState({ champ: Object.values(data.data), error: ''});
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  render () {
    const { champ } = this.state;

    return (
      <div className="container">
        <img src={"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.props.match.params.id + "_2.jpg"}></img>
        {(() => {
          return champ.map((champion) => {
            return <ChampFacts key={champion.id} champion={champion} />;
          })
        })()}
      </div>
     
    )
  }
}

export default Champion;
