import React, { useState, useCallback } from "react";
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
import LoginPage from "./login/pages/LoginPage";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
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
    );
  } else {
    routes = (
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
            <Redirect to="/login" />
          </Route>
          <Route path="/projects/update/:pid" exact>
            <Redirect to="/login" />
          </Route>
          <Route path="/projects/:pid" exact>
            <ProjectSubPage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
