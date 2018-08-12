import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import Topics from "./Topics";
import DisplayArticlesByTopic from "./DisplayArticlesByTopic";
import * as api from "../api";
import Article from "./Article";
import PostArticle from "./PostArticle";

class Articles extends Component {
  state = {
    articles: [],
    comments: [],
    topics: [],
    articleTitleInput: "",
    articleBodyInput: "",
    topicDropdownInput: "",
    redirect: false,
    newArticle: ""
  };

  componentDidMount() {
    this.getTopics();
  }

  render() {
    if (this.state.redirect)
      return <Redirect to={`/articles/article/${this.state.newArticle._id}`} />;
    return (
      <div>
        {<Topics topics={this.state.topics} />}
        <Route
          path="/articles/topics/:topic"
          render={props => (
            <DisplayArticlesByTopic articles={this.state.articles} {...props} />
          )}
        />

        <Route
          path="/articles/article/:article_id"
          render={props => <Article user={this.props.currentUser} {...props} />}
        />
        <Route
          path="/articles/new"
          render={() => (
            <PostArticle
              user={this.props.currentUser}
              postArticle={this.postArticle}
              handleChange={this.handleChange}
            />
          )}
        />
      </div>
    );
  }

  getArticlesByTopic = topic => {
    axios
      .get(
        `https://tg-northcoders-news.herokuapp.com/api/topics/${topic}/articles`
      )
      .then(({ data }) => {
        this.setState({ articles: data.articles });
      });
  };

  getTopics = () => {
    axios
      .get("https://tg-northcoders-news.herokuapp.com/api/topics")
      .then(({ data }) => {
        this.setState({ topics: data.topics });
      });
  };

  postArticle = e => {
    e.preventDefault();
    !this.props.currentUser._id
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
                  this.props.currentUser._id
                )
                .then(article => {
                  alert(
                    "thank you! your article has been posted successfully."
                  );
                  this.setState({
                    newArticle: article,
                    topicDropdownInput: "",
                    articleTitleInput: "",
                    articleBodyInput: "",
                    redirect: true
                  });
                });
  };

  handleChange = e => {
    let key = e.target.id;
    let val = e.target.value;
    let obj = {};
    obj[key] = val;
    this.setState(obj);
  };
}

export default Articles;
