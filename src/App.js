import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import { FaMoon, FaTwitter, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import Champion from './Champion';
import Home from './Home';

const App = () => {
  return (
    <>
      <Router>
        <nav className="container">
          <Link className="navbar-brand" to="/">Where in the world?</Link>
          <button><FaMoon /> Dark Mode</button>
        </nav>
        <Switch>
          <Route path="/" exact component={Home } />
          <Route path="/champion/:id" component={Champion} />
        </Switch>
      </Router>

      <footer className="container">
        <p><FaTwitter /> <a target="_blank" href="https://twitter.com">Twitter</a></p>
        <p><FaLinkedin /> <a target="_blank" href="https://linkedin.com/in/henry-hein">Linkedin Account</a></p>
        <p><FaGithub /> <a target="_blank" href="https://www.github.com/henry-hein">Github</a></p>
        <p><FaGlobe /> <a target="_blank" href="https://henryhein.netlify.app">Personal Portfolio</a></p>
      </footer>
    </>
  );
}

export default App;
