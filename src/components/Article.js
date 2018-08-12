import React, { Component } from "react";
import { getSingleItem, getComments } from "../api";
import PostComment from "./PostComment";
import Vote from "./Vote";
import * as api from "../api";

class Article extends Component {
  state = { article: {}, comments: [], voteChange: 0 };

  componentDidMount() {
    const { match } = this.props;
    getSingleItem(match.params.article_id, "articles").then(article => {
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
          posted at: {article.created_at} by: {article.created_by}
        </p>
        <button onClick={this.showComments}>
          {this.state.comments.length === 0 ? "comments" : "hide comments"}
        </button>
        {this.state.comments.map(comment => {
          return (
            <div>
              <p>{comment.body}</p>
              score: {comment.votes + voteChange}
              <Vote
                handleClick={this.vote}
                item={comment}
                itemType="comments"
              />
              <p className="smallerText">
                posted at: {comment.created_at} by: {comment.created_by}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  showComments = () => {
    this.state.comments.length === 0
      ? getComments(this.state.article._id).then(comments =>
          this.setState({ comments })
        )
      : this.setState({ comments: [] });
  };

  vote = (id, direction, item) => {
    console.log("clicked...");
    api
      .handleVote(id, direction, item)
      .then(
        this.setState({
          voteChange: direction === "up" ? 1 : -1
        })
      )
      .catch(err => console.log(err));
  };
}

export default Article;
