import React, { useState, useCallback, useEffect, Suspense } from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "./home/pages/Home";
import MainNavigation from "./shared/Navigation/MainNavigation";
import LoadingSpinner from "./shared/modals/LoadingSpinner";

import { AuthContext } from "./shared/context/auth-context";

import "./App.css";

// In case you do not want to lazy load
// import About from "./about/pages/About";
// import Contact from "./contact/pages/Contact";
// import ProjectMainPage from "./projects/pages/ProjectMainPage";
// import ProjectSubPage from "./projects/pages/ProjectSubPage";
// import ProjectInputPage from "./projects/pages/ProjectInputPage";
// import ProjectUpdatePage from "./projects/pages/ProjectUpdatePage";
// import LoginPage from "./login/pages/LoginPage";
// import ProductsMainPage from "./sellSecondhand/pages/ProductsMainPage";
// import ProductsSubPage from "./sellSecondhand/pages/ProductsSubPage";
// import ProductsPurchasePage from "./sellSecondhand/pages/ProductsPurchasePage";
// import ProductsInputPage from "./sellSecondhand/pages/ProductsInputPage";
// import ProductsInventory from "./sellSecondhand/pages/ProductsInventory";
import SignUpPage from "./login/pages/SignUpPage";
import Footer from "./shared/Footer/Footer";
// Lazy loading
const About = React.lazy(() => import("./about/pages/About"));
const Contact = React.lazy(() => import("./contact/pages/Contact"));

// Login
const LoginPage = React.lazy(() => import("./login/pages/LoginPage"));
// const SignUpPage = React.lazy(() => import("./login/pages/SignUpPage"));
const UpdateInfoPage = React.lazy(() => import("./login/pages/UpdateInfoPage"));

// Projects
const ProjectMainPage = React.lazy(() =>
  import("./projects/pages/ProjectMainPage")
);
const ProjectSubPage = React.lazy(() =>
  import("./projects/pages/ProjectSubPage")
);
const ProjectInputPage = React.lazy(() =>
  import("./projects/pages/ProjectInputPage")
);
const ProjectUpdatePage = React.lazy(() =>
  import("./projects/pages/ProjectUpdatePage")
);

// Products
const ProductsMainPage = React.lazy(() =>
  import("./sellSecondhand/pages/ProductsMainPage")
);
const ProductsSubPage = React.lazy(() =>
  import("./sellSecondhand/pages/ProductsSubPage")
);
const ProductsPurchasePage = React.lazy(() =>
  import("./sellSecondhand/pages/ProductsPurchasePage")
);
const ProductsInputPage = React.lazy(() =>
  import("./sellSecondhand/pages/ProductsInputPage")
);
const ProductsInventory = React.lazy(() =>
  import("./sellSecondhand/pages/ProductsInventory")
);

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
    localStorage.removeItem("userData");
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
        <Route path="/updateinfo" exact>
          <UpdateInfoPage />
        </Route>
        <Route path="/signup" exact>
          <SignUpPage />
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
        <Route path="/products/purchase/:pid" exact>
          <ProductsPurchasePage />
        </Route>
        <Route path="/products/newinput" exact>
          <ProductsInputPage />
        </Route>
        <Route path="/products/inventory" exact>
          <ProductsInventory />
        </Route>
        <Route path="/products/:pid" exact>
          <ProductsSubPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
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
        <Route path="/updateinfo" exact>
          <LoginPage />
        </Route>
        <Route path="/signup" exact>
          <SignUpPage />
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
        <Route path="/products/newinput" exact>
          <LoginPage />
        </Route>
        <Route path="/products/inventory" exact>
          <LoginPage />
        </Route>
        <Route path="/products/:pid" exact>
          <ProductsSubPage />
        </Route>
        <Redirect to="/login" />
      </Switch>
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
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
          <Footer />
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
