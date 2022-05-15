import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import { FaTwitter, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import Champion from './Champion';
import Home from './Home';

const App = () => {
  return (
    <>
      <Router>
        <nav className="">
          <div className="nav-container">
            <Link className="navbar-brand" to="/">LEAGUE OF LEGENDS</Link>
            <div className="socials">
              <p><FaTwitter /> <a target="_blank" href="https://twitter.com"></a></p>
              <p><FaLinkedin /> <a target="_blank" href="https://linkedin.com/in/henry-hein"></a></p>
              <p><FaGithub /> <a target="_blank" href="https://www.github.com/henry-hein"></a></p>
              <p><FaGlobe /> <a target="_blank" href="https://henryhein.netlify.app"></a></p>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/" exact component={Home } />
          <Route path="/champion/:id" component={Champion} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
