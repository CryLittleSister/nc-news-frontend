import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Error404 from "./components/Error404";
import UserBar from "./components/UserBar";
import Articles from "./components/Articles";

class App extends Component {
  state = {
    currentArticle: {},
    currentUser: {},
    currentComment: {}
  };

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Header />
        <UserBar
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

  // setCurrentArticle = article => this.setState({ currentArticle: article });

  logout = () => {
    console.log("clicked");
    this.setState({ currentUser: {} });
  };
}

export default App;
