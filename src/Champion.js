import React, { useState, useEffect } from 'react';
import {json, checkStatus } from './utils';

const ChampFacts = (props) => {
  const {
    name,
    id,
    title,
    stats,
    lore,
    passive,
    skins,
    spells,
  } = props.champion;


  return (
    <>
      <div className="champ-banner" style={{backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', paddingTop: 'calc((1/3)*100%)'}}>
        {/* <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + ${id} + _0.jpg`} /> */}
        <div className="champ-banner-info">
          <h2>{title}</h2>
          <h1>{name}</h1>
        </div>
      </div>
      <div className="champ-lore"><p>{lore}</p></div>
      <div className="champ-abilities container">
        <h1>ABILITIES</h1>
        <ul className="champ-ability" >
            <li>
                <img src={`https://ddragon.leagueoflegends.com/cdn/12.8.1/img/passive/${passive.image.full}`}></img>
                <div>
                  <p>{passive.name}</p>
                  <div>{passive.description}</div>
                </div>
            </li>
        {(() => {
          return spells.map((spell) => {
            return (
                <li key={spell.id}  >
                  <img src={`https://ddragon.leagueoflegends.com/cdn/12.8.1/img/spell/${spell.image.full}`}></img>
                  <div>
                    <p>{spell.name}</p>
                    <div>{spell.description}</div>
                  </div>
                </li> 
            );
          })
        })()}
        </ul>
      </div>
      <div className="champ-skins container">
        <h1>SKINS</h1>
        <ul>
        {(() => {
          return skins.map((skin) => {
            return (
                <li key={skin.num}>
                  <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${skin.num}.jpg`}></img>
                </li> 
            );
          })
        })()}
        </ul>
      </div>
    </>
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
      <div className="champ-page-container">
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
