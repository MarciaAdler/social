import React from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./App.sass";
import { StoreProvider } from "../src/utils/GlobalState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
