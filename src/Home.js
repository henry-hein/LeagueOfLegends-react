import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';
import ChampFilterMenu from './ChampFilter';
import DropdownMenu from './DropdownMenu';

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
        console.log(data.data);
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
        <div className="container hero">
          <div className="banner">
            <h3 className="banner-item-medium">Choose your</h3>
            <h1 className="banner-item-big"><span >CHAMPION</span></h1>
            <p className="banner-item-small">With more than 150 champions, you'll find the perfect match for your playstyle. Master one, or master them all.</p>
          </div>
          <div className="menu-container">
            <div className="search-box">
              <input type="search" className="search" placeholder="&#128269;      SEARCH"/>
            </div>
            <ChampFilterMenu />
            {/* <select className="dropdown" name="difficulty">
              <option value="all">All Difficulties</option>
              <option value="one">-</option>
              <option value="two">- -</option>
              <option value="three">- - -</option>
            </select> */}
            <DropdownMenu />
          </div>
        </div>
          <div className="container champs-container">
            
            {(() => {
              return results.map((champ) => {
                return <Champ key={champ.id} champ={champ} />;
              })
            })()}
          </div>
      </>
    )
  }
}

export default Champion;