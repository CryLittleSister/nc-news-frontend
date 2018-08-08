import React, { Component } from "react";

class Articles extends Component {
  state = {
    articles,
    comments
    /*current user etc fed from App. also send a method which allows changing of app state of current user/article etc */
  };
  render() {
    return <div>placeholder</div>;
  }
}
/* any methods that create, delete or edit articles and comments will live here. all voting lives here too */
export default Articles;
