import React from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </StoreProvider>
      <Footer />
    </div>
  );
}

export default App;
