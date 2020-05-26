import React, { useState, useCallback, useEffect } from "react";
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
import ProductsMainPage from "./sellSecondhand/pages/ProductsMainPage";
import ProductsSubPage from "./sellSecondhand/pages/ProductsSubPage";
import ProductsPurchasePage from "./sellSecondhand/pages/ProductsPurchasePage";

let logoutTimer;

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(false);
  const [tokenExpireDate, setTokenExpireDate] = useState();

  const login = useCallback((userId, token, expireDate) => {
    // setIsLoggedIn(true);
    setToken(token);
    setUserId(userId);
    const tokenExpireDate =
      expireDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpireDate(tokenExpireDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userId,
        token: token,
        expire: tokenExpireDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    // setIsLoggedIn(false);
    setToken(null);
    setTokenExpireDate(null);
    setUserId(null);
  }, []);

  useEffect(() => {
    if (token && tokenExpireDate) {
      const remainingTime = tokenExpireDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpireDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expire) > new Date()
    ) {
      // console.log("I am here");
      login(storedData.userId, storedData.token, new Date(storedData.expire));
    }
  }, [login]);

  let routes;
  if (token) {
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
          <Route path="/products" exact>
            <ProductsMainPage />
          </Route>
          <Route path="/products/:pid" exact>
            <ProductsSubPage />
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
            <LoginPage />
          </Route>
          <Route path="/projects/update/:pid" exact>
            <LoginPage />
          </Route>
          <Route path="/projects/:pid" exact>
            <ProjectSubPage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/products" exact>
            <ProductsMainPage />
          </Route>
          <Route path="/products/purchase/:pid" exact>
            <ProductsPurchasePage />
          </Route>
          <Route path="/products/:pid" exact>
            <ProductsSubPage />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </main>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
