import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "./home/pages/Home";
import About from "./about/pages/About";
import Contact from "./contact/pages/Contact";
import MainNavigation from "./shared/Navigation/MainNavigation";
import ProjectMainPage from "./projects/pages/ProjectMainPage";
import ProjectSubPage from "./projects/pages/ProjectSubPage";
import ProjectInputPage from "./projects/pages/ProjectInputPage";
import ProjectUpdatePage from "./projects/pages/ProjectUpdatePage";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
          <Route path="/projects" exact>
            <ProjectMainPage />
          </Route>
          <Route path="/projects/newinput" exact>
            <ProjectInputPage />
          </Route>
          <Route path="/projects/update/:pid" exact>
            <ProjectUpdatePage />
          </Route>
          <Route path="/projects/:pid" exact>
            <ProjectSubPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
