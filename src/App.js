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
import User from "./components/User";
import * as api from "./api";
import CreateUser from "./components/CreateUser";
import Error400 from "./components/Error400";

class App extends Component {
  state = {
    currentUser: { votes: { articles: {}, comments: {} } },
    users: [],
    newPost: {},
    redirect: false,
    articles: [],
    sortBy: "votes"
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("currentUser")))
      this.setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    this.getUsers();
    this.getSortedArticles(this.state.sortBy);
  }

  componentDidUpdate(...args) {
    if (this.state.sortBy !== args[1].sortBy)
      this.getSortedArticles(this.state.sortBy);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route
          path="/"
          render={props => (
            <UserBar
              {...this.props}
              users={this.state.users}
              setCurrentUser={this.setCurrentUser}
              currentUser={this.state.currentUser}
              logout={this.logout}
              {...props}
            />
          )}
        />

        <Switch>
          <Route path="/topics/:topic" component={Articles} />
          <Route
            path="/articles/post"
            render={() => (
              <PostArticle
                newArticle={this.state.newPost}
                redirect={this.state.redirect}
                postArticle={this.postArticle}
                handleChange={this.handleChange}
              />
            )}
          />
          <Route path="/articles" component={Articles} />
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
          <Route
            path="/users/create"
            render={() => <CreateUser users={this.state.users} />}
          />
          <Route path="/users/:user_id" component={User} />
          <Route
            exact
            path="/"
            render={props => (
              <Homepage
                articles={this.state.articles}
                sortBy={this.state.sortBy}
                sort={this.sort}
              />
            )}
          />
          <Route path="/error400" component={Error400} />
          <Route path={"*" || "/error404"} component={Error404} />
        </Switch>
      </div>
    );
  }

  setCurrentUser = user => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    api
      .getSingleItem(user, "users")
      .then(({ user }) => this.setState({ currentUser: user }));
  };

  logout = () => {
    localStorage.removeItem("currentUser");
    this.setState({ currentUser: {} });
  };

  sort = e => {
    let sortBy = e.target.className;
    this.setState({ sortBy });
  };

  getSortedArticles = sortBy => {
    api.getAll("articles").then(({ articles }) => {
      let sortFunc =
        sortBy === "created_at"
          ? (a, b) => new Date(b[sortBy]) - new Date(a[sortBy])
          : (a, b) => b[sortBy] - a[sortBy];

      this.setState({ articles: articles.sort(sortFunc).slice(0, 3) });
    });
  };

  postArticle = e => {
    e.preventDefault();
    let {
      topicDropdownInput,
      articleTitleInput,
      articleBodyInput,
      currentUser
    } = this.state;
    !currentUser._id
      ? alert("you must be logged in to post a new article")
      : !topicDropdownInput
        ? alert("please choose a topic")
        : !articleTitleInput
          ? alert("please give your article a title")
          : !/.{20}/.test(articleBodyInput)
            ? alert("articles must contain no fewer than 20 characters")
            : api
                .postArticle(
                  topicDropdownInput,
                  articleTitleInput,
                  articleBodyInput,
                  currentUser._id
                )
                .then(article =>
                  this.setState({
                    newPost: article,
                    topicDropdownInput: "",
                    articleTitleInput: "",
                    articleBodyInput: "",
                    redirect: true
                  })
                );
  };

  handleChange = e => {
    let key = e.target.className;
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
