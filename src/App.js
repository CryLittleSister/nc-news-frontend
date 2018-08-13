import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Error404 from "./components/Error404";
import UserBar from "./components/UserBar";
import Articles from "./components/Articles";
import { getUsers } from "./api";

class App extends Component {
  state = {
    currentUser: {},
    users: []
  };

  componentDidMount() {
    getUsers().then(users => {
      this.setState({ users });
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <UserBar
          users={this.state.users}
          setCurrentUser={this.setCurrentUser}
          currentUser={this.state.currentUser}
          logout={this.logout}
        />
        <Switch>
          <Route
            path="/articles"
            render={props => (
              <Articles
                currentArticle={this.state.currentArticle}
                currentUser={this.state.currentUser}
                users={this.state.users}
                handleChange={this.handleChange}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => {
              return <Homepage />;
            }}
          />
          <Route path="/*" component={Error404} />
        </Switch>
      </div>
    );
  }

  setCurrentUser = user => {
    this.setState({ currentUser: user });
  };

  logout = () => {
    console.log("clicked");
    this.setState({ currentUser: {} });
  };
}

export default App;
