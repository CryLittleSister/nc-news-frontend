import React, { Component } from "react";
import * as api from "../api";
import Vote from "./Vote";
import Comments from "./Comments";
import PT from "prop-types";

class Article extends Component {
  state = {
    article: {},
    comments: [],
    voteChange: { comments: {}, articles: {} },
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
      <div id="article" key={article._id}>
        <h2>{article.title}</h2>
        <article>{article.body}</article>
        score: {article.votes + (voteChange.articles[article._id] || 0)}
        <Vote handleClick={this.vote} item={article} itemType="articles" />
        <p className="smallerText">
          posted on: {new Date(article.created_at).toString()} by:{" "}
          {this.convertUsernameFromID(article.created_by)}
        </p>
        <button
          className="myButton"
          onClick={() => this.showComments(article.comments)}
        >
          {this.state.comments.length === 0 ? "comments" : "hide comments"}
        </button>
        ({article.comments + this.state.commentsAdded}) <br />
        <form>
          <input
            onChange={this.handleChange}
            placeholder="add comment..."
            value={this.state.commentBodyInput}
            id="commentBodyInput"
          />
          <button onClick={this.postComment}>post</button>
        </form>
        <Comments
          convert={this.convertUsernameFromID}
          comments={this.state.comments}
          vote={this.vote}
          user={this.props.user._id}
          deleteComment={this.deleteComment}
          voteChange={this.state.voteChange.comments}
        />
      </div>
    );
  }

  showComments = articleComments => {
    this.state.comments.length === 0 && articleComments !== 0
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
            .then(newComment => {
              let comments = [...this.state.comments];
              comments.push(newComment);
              let num = this.state.commentsAdded;
              this.setState({
                commentBodyInput: "",
                commentsAdded: (num += 1),
                comments
              });
            });
  };

  vote = (id, direction, item) => {
    let voteChange = { ...this.state.voteChange };

    let { user } = { ...this.props };
    if (!user.username) alert("you must be logged in to cast your vote");
    else if (!user.votes[item][id]) {
      user.votes[item][id] = direction === "up" ? 1 : -1;
      voteChange[item][id] = direction === "up" ? 1 : -1;
      api.handleVote(id, direction, user._id, item);
      console.log(voteChange);
      this.setState({ user, voteChange });
    }
  };

  handleChange = e => {
    let key = e.target.id;
    let val = e.target.value;
    let obj = {};
    obj[key] = val;
    this.setState(obj);
  };

  deleteComment = e => {
    let num = this.state.commentsAdded;
    let comments = [...this.state.comments].filter(
      comment => comment._id !== e.target.id
    );
    if (window.confirm("Are you sure you want to delete this comment?"))
      api
        .deleteComment(e.target.id)
        .then(this.setState({ comments, commentsAdded: (num -= 1) }));
  };

  convertUsernameFromID = id => {
    let key = {};
    this.props.users.forEach(user => {
      key[`${user._id}`] = user.username;
    });
    return key[`${id}`];
  };
}
Article.propTypes = {
  user: PT.object,
  users: PT.array.isRequired
};

export default Article;
