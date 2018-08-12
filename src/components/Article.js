import React, { Component } from "react";
import * as api from "../api";
import Vote from "./Vote";
import Comments from "./Comments";

class Article extends Component {
  state = {
    article: {},
    comments: [],
    voteChange: 0,
    commentBodyInput: "",
    commentsAdded: 0
  };

  componentDidMount() {
    const { match } = this.props;
    api.getSingleItem(match.params.article_id, "articles").then(article => {
      this.setState({ article });
    });
  }

  render() {
    const { article, voteChange } = this.state;
    if (!article.title) return <div>loading...</div>;
    return (
      <div key={article._id}>
        <h2>{article.title}</h2>
        <article>{article.body}</article>
        score: {article.votes + voteChange}
        <Vote handleClick={this.vote} item={article} itemType="articles" />
        <p className="smallerText">
          posted on: {new Date(article.created_at).toString()} by:{" "}
          {this.convertUsernameFromID(article.created_by)}
        </p>
        <button onClick={this.showComments}>
          {this.state.comments.length === 0 ? "comments" : "hide comments"}
        </button>
        ({article.comments + this.state.commentsAdded}) <br />
        <input
          onChange={this.handleChange}
          placeholder="add comment..."
          value={this.state.commentBodyInput}
          id="commentBodyInput"
        />
        <button onClick={this.postComment}>post</button>
        <Comments
          convert={this.convertUsernameFromID}
          comments={this.state.comments}
          vote={this.vote}
          user={this.props.user._id}
          deleteComment={this.deleteComment}
        />
      </div>
    );
  }

  showComments = () => {
    this.state.comments.length === 0
      ? api
          .getComments(this.state.article._id)
          .then(comments => this.setState({ comments }))
      : this.setState({ comments: [] });
  };

  postComment = e => {
    e.preventDefault();
    !this.props.user._id
      ? alert("you must be logged in to post a new comment")
      : !this.state.commentBodyInput
        ? alert("comments cannot be blank")
        : api
            .postComment(
              this.state.commentBodyInput,
              this.props.user._id,
              this.state.article._id
            )
            .then(() => {
              alert("new comment successfully added!");
              this.setState({
                commentBodyInput: "",
                commentsAdded: (this.state.commentsAdded += 1)
              });
            });
  };

  vote = (id, direction, item) => {
    api
      .handleVote(id, direction, item)
      .then(
        this.setState({
          voteChange: direction === "up" ? 1 : -1
        })
      )
      .catch(err => console.log(err));
  };

  handleChange = e => {
    let key = e.target.id;
    let val = e.target.value;
    let obj = {};
    obj[key] = val;
    this.setState(obj);
  };

  deleteComment = e => {
    if (window.confirm("Are you sure you want to delete this comment?"))
      api
        .deleteComment(e.target.id)
        .then(alert("comment successfully deleted!"));
  };

  convertUsernameFromID = id => {
    let key = {};
    this.props.users.forEach(user => {
      key[`${user._id}`] = user.username;
    });
    return key[`${id}`];
  };
}

export default Article;
