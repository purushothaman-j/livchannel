import React, { useState } from "react";
import "./App.css";
import { useStateValue } from "./StateProvider";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className="app__body">
              <Sidebar />
              <Switch>
                <Route path="/room/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <div className="app__main">
                    <h1>Welcome to Livchannel !</h1>
                    <img src="/chat.png" />
                    <h2>Click any channel to start chat !</h2>
                    <p>- Purushothaman J</p>
                  </div>
                </Route>
              </Switch>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
