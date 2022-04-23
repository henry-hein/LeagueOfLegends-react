import React , { useState } from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';
import ChampFilterMenuItem from './ChampFilter';
import DropdownMenu from './DropdownMenu';
import { GiWingfoot, GiBullseye, GiShoulderArmor, GiHealthPotion, GiAxeSword } from "react-icons/gi";

const Champ = (props) => {
  const {
    name,
    id,
    title,
    tags,
    stats,
  } = props.champ;

  return (
    <div className="champ-card">
        <Link to={`champ/${id}/`}>
          <div className="img-container" style={{"--aspect-ratio":1/1.3}}>
            <img src={"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + id + "_0.jpg"}></img>
          </div>
          <div className="champ-info">
            <h3 className="champ-name">{name}</h3>
            <h4 className="champ-title">{title}</h4>
            <ul className="champ-stats">
              <li className="champ-stat"><GiShoulderArmor /> {stats.armor}</li>
              <li className="champ-stat"><GiAxeSword /> {stats.attackdamage}</li>
              <li className="champ-stat"><GiHealthPotion /> {stats.hp}</li>
              <li className="champ-stat"><GiWingfoot /> {stats.movespeed}</li>
              <li className="champ-stat"><GiBullseye /> {stats.attackrange}</li>
            </ul>
            <ul className="champ-roles">
              <li>Role:</li>
              <li className="champ-role">{tags[0]}</li>
            </ul>
          
          </div>
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
      searchTerm: '',
      champRole: 'all',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getRole = this.getRole.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleClick(event) {
    this.setState({ champRole: event.target.value });
  }

  getRole = (role) => {
    this.setState({ champRole: role.toLowerCase()});
  }

  componentDidMount() {
    fetch("http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json")
    .then(checkStatus)
    .then(json)
    .then((data) => {
        // console.log(Object.values(data.data));
        this.setState({ results: Object.values(data.data), error: ''});
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  render() {
    const { results, searchTerm, champRole } = this.state;
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
              <input type="search" onChange={this.handleChange} className="search" placeholder="&#128269;      SEARCH"/>
            </div>
            <div className="champ-filter-container">
              <button className=""><span>Choose Champ Type</span></button>
              <ul className="champ-filter champ-filter-menu active">
                <ChampFilterMenuItem getChampRole={this.getRole} champType="ALL" />
                <ChampFilterMenuItem getChampRole={this.getRole} champType="ASSASSIN" />
                <ChampFilterMenuItem getChampRole={this.getRole} champType="FIGHTER" />
                <ChampFilterMenuItem getChampRole={this.getRole} champType="MAGE" />
                <ChampFilterMenuItem getChampRole={this.getRole} champType="MARKSMAN" />
                <ChampFilterMenuItem getChampRole={this.getRole} champType="SUPPORT" />
                <ChampFilterMenuItem getChampRole={this.getRole} champType="TANK" />
              </ul>
            </div>
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
              return (
                results.filter((champ) => { 
                  if(searchTerm === '' && champ.tags[0].toLowerCase() === champRole){
                    return champ;
                  } 
                  else if(champ.tags[0].toLowerCase() === champRole && champ.id.toLowerCase().includes(searchTerm.toLowerCase())){
                    return champ;
                  } 
                  else if(champRole ==='all' && searchTerm !== '' && champ.id.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return champ;
                  }
                  else if(searchTerm === '' && champRole ==='all'){
                    return champ;
                  } 
                }).map((champ) => {
                  return (
                    <Champ key={champ.id} champ={champ} />
                  );
                })
              )
            })()}
          </div>
      </>
    )
  }
}

export default Champion;

// return results.map((champ) => {
//   return <Champ key={champ.id} champ={champ} />;