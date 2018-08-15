import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Error404 from "./components/Error404";
import UserBar from "./components/UserBar";
import Articles from "./components/Articles";
import Article from "./components/Article";
import PostArticle from "./components/PostArticle";
import Topics from "./components/Topics";
import DisplayArticlesByTopic from "./components/DisplayArticlesByTopic";
import * as api from "./api";

class App extends Component {
  state = {
    currentUser: {},
    users: [],
    newArticle: {},
    redirect: false
  };

  componentDidMount() {
    this.getUsers();
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
        <Topics />
        <Switch>
          <Route path="/topics/:topic" component={DisplayArticlesByTopic} />
          <Route
            path="/articles/post"
            render={() => (
              <PostArticle
                newArticle={this.state.newArticle}
                redirect={this.state.redirect}
                postArticle={this.postArticle}
                handleChange={this.handleChange}
              />
            )}
          />
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
            path="/article/:article_id"
            render={props => (
              <Article
                user={this.state.currentUser}
                users={this.state.users}
                {...props}
              />
            )}
          />
          <Route exact path="/" component={<Homepage />} />
          <Route path="/*" component={Error404} />
        </Switch>
      </div>
    );
  }

  setCurrentUser = user => {
    this.setState({ currentUser: user });
  };

  logout = () => {
    this.setState({ currentUser: {} });
  };

  postArticle = e => {
    e.preventDefault();
    !this.state.currentUser._id
      ? alert("you must be logged in to post a new article")
      : !this.state.topicDropdownInput
        ? alert("please choose a topic")
        : !this.state.articleTitleInput
          ? alert("please give your article a title")
          : !/.{20}/.test(this.state.articleBodyInput)
            ? alert("articles must contain no fewer than 20 characters")
            : api
                .postArticle(
                  this.state.topicDropdownInput,
                  this.state.articleTitleInput,
                  this.state.articleBodyInput,
                  this.state.currentUser._id
                )
                .then(article =>
                  this.setState({
                    newArticle: article,
                    topicDropdownInput: "",
                    articleTitleInput: "",
                    articleBodyInput: "",
                    redirect: true
                  })
                );
  };

  handleChange = e => {
    let key = e.target.id;
    let val = e.target.value;
    let obj = {};
    obj[key] = val;
    this.setState(obj);
  };

  getUsers = () => {
    api.getAll("users").then(({ users }) => {
      this.setState({ users });
    });
  };
}

export default App;
