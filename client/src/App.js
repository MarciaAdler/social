import React from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import ViewProfile from "./Pages/ViewProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./Pages/Profile";
import Yelp from "./Pages/Yelp";

import "./App.sass";
import { StoreProvider } from "../src/utils/GlobalState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/viewprofile" component={ViewProfile} />
            <Route path="/restaurants" component={Yelp} />
          </Switch>
        </Router>
      </StoreProvider>
      <Footer />
    </div>
  );
}

export default App;
