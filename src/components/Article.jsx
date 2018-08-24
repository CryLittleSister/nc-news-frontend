import React, { Component } from "react";
import * as api from "../api";
import Vote from "./Vote";
import Comments from "./Comments";
import PT from "prop-types";
import UndoVote from "./UndoVote";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";
import "../Articles.css";

class Article extends Component {
  state = {
    article: {},
    comments: [],
    voteChange: { comments: {}, articles: {} },
    commentBodyInput: "",
    commentsAdded: 0,
    err: false
  };

  componentDidMount() {
    this.getArticle();
  }

  render() {
    const {
      article,
      voteChange,
      err,
      redirect,
      commentsAdded,
      commentBodyInput,
      comments
    } = this.state;
    const { user } = this.props;
    if (err) return <Redirect to={`/error${err}`} />;
    if (!article.title) return <div>loading...</div>;
    if (redirect) return <Redirect to={`/articles`} />;
    return (
      <div>
        <Link className="link" to="/articles">
          <i className="fas fa-arrow-left backArticles">
            {" "}
            Back to All Articles
          </i>
        </Link>
        <div id="article" key={article._id}>
          <h2 className="singleArticleTitle">{article.title}</h2>
          <img
            src={article.img}
            alt={article.belongs_to}
            className="singleArticleImage"
          />
          <article className="articleText">{article.body}</article>
          score:{" "}
          <span
            className={
              user.votes && user.votes.articles[article._id] && "voted"
            }
          >
            {article.votes + (voteChange.articles[article._id] || 0)}
          </span>
          {!user.votes || !user.votes.articles[article._id] ? (
            <Vote handleClick={this.vote} item={article} itemType="articles" />
          ) : (
            <UndoVote
              handleClick={this.vote}
              dir={user.votes.articles[article._id] === 1 ? "down" : "up"}
              id={article._id}
              itemType="articles"
            />
          )}
          {article.created_by === user._id && (
            <button id={article._id} onClick={this.deleteArticle}>
              DELETE ARTICLE
            </button>
          )}
          <p className="smallerText">
            posted{" "}
            {moment(article.created_at)
              .fromNow()
              .toString()}{" "}
            by{" "}
            <Link className="link" to={`/users/${article.created_by}`}>
              {" "}
              {this.convertUsernameFromID(article.created_by)}{" "}
            </Link>
          </p>
          <button
            className="myButton"
            onClick={() => this.showComments(article.comments)}
          >
            {this.state.comments.length === 0 ? "comments" : "hide comments"}
          </button>
          ({article.comments + commentsAdded}) <br />
          <form>
            <input
              onChange={this.handleChange}
              placeholder="add comment..."
              value={commentBodyInput}
              id="commentBodyInput"
            />
            <button onClick={this.postComment}>post</button>
          </form>
          <Comments
            convert={this.convertUsernameFromID}
            comments={comments}
            vote={this.vote}
            user={user}
            deleteComment={this.deleteComment}
            voteChange={voteChange.comments}
          />
        </div>
      </div>
    );
  }

  getArticle = () => {
    const { article_id } = this.props.match.params;

    api
      .getSingleItem(article_id, "articles")
      .then(({ article }) => {
        article.img =
          article.belongs_to === "football"
            ? "https://brightcove04pmdo-a.akamaihd.net/4221396001/4221396001_5690886054001_5690865152001-vs.jpg?pubId=4221396001&videoId=5690865152001"
            : article.belongs_to === "coding"
              ? "https://media.boingboing.net/wp-content/uploads/2018/05/sale_15014_primary_image_wide.jpg"
              : "https://3gwtod2hg0th1ikege3y0nok-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/Screen-Shot-2016-09-07-at-22.15.40-1024x397.png";
        this.setState({ article });
      })
      .catch(err => this.setState({ err: err.response.status }));
  };

  showComments = articleComments => {
    const { comments, article } = this.state;
    comments.length === 0 && articleComments !== 0
      ? api
          .getComments(article._id)
          .then(comments => this.setState({ comments }))
      : this.setState({ comments: [] });
  };

  postComment = e => {
    const { commentBodyInput, article, commentsAdded } = this.state;
    const { _id } = this.props.user;
    e.preventDefault();
    !_id
      ? alert("you must be logged in to post a new comment")
      : !commentBodyInput
        ? alert("comments cannot be blank")
        : api
            .postComment(commentBodyInput, _id, article._id)
            .then(newComment => {
              let comments = [...this.state.comments];
              comments.push(newComment);
              let num = commentsAdded;
              this.setState({
                commentBodyInput: "",
                commentsAdded: (num += 1),
                comments
              });
            });
  };

  vote = (id, direction, item) => {
    let { voteChange } = { ...this.state };
    let { user } = { ...this.props };
    if (!user.username) alert("you must be logged in to cast your vote");
    else if (!user.votes[item][id]) {
      user.votes[item][id] = direction === "up" ? 1 : -1;
      voteChange[item][id] = direction === "up" ? 1 : -1;
      api.handleVote(id, direction, user._id, item);

      this.setState({ voteChange });
    } else {
      user.votes[item][id] =
        direction === "up"
          ? user.votes[item][id] + 1
          : user.votes[item][id] - 1;
      voteChange[item][id] =
        direction === "up"
          ? voteChange[item][id] + 1
          : voteChange[item][id] - 1;

      api.handleVote(id, direction, user._id, item, true);
      this.setState({ voteChange });
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
        .deleteItem(e.target.id, "comments")
        .then(this.setState({ comments, commentsAdded: (num -= 1) }));
  };

  deleteArticle = e => {
    if (window.confirm("Are you sure you want to delete this article?"))
      api
        .deleteItem(e.target.id, "articles")
        .then(this.setState({ redirect: true }));
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
