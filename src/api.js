import axios from "axios";

const URL = "https://tg-northcoders-news.herokuapp.com/api";

export const handleVote = (id, direction, item) => {
  console.log(item, "<<<<", direction, ">>>>>");
  return axios
    .put(`${URL}/${item}/${id}?vote=${direction}`)
    .then(data => data.data);
};

export const getSingleItem = (id, item) => {
  return axios.get(`${URL}/${item}/${id}`).then(data => data.data.article);
};

export const getArticlesByTopic = topic => {
  return axios
    .get(
      `https://tg-northcoders-news.herokuapp.com/api/topics/${topic}/articles`
    )
    .then(data => data.data.articles);
};

export const getComments = articleID => {
  return axios
    .get(`${URL}/articles/${articleID}/comments`)
    .then(data => data.data.comments);
};

export const postArticle = (topic, title, body, user) => {
  return axios
    .post(`${URL}/topics/${topic}/articles`, {
      title,
      body,
      created_by: user
    })
    .then(data => data.data.article);
};

export const postComment = (body, user, article) => {
  return axios
    .post(`${URL}/articles/${article}/comments`, { body, created_by: user })
    .then(data => console.log(data.data));
};
