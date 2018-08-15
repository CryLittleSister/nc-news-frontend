import axios from "axios";

const URL = "https://tg-northcoders-news.herokuapp.com/api";

export const handleVote = (id, direction, item) => {
  return axios
    .put(`${URL}/${item}/${id}?vote=${direction}`)
    .then(({ data }) => data);
};

export const getSingleItem = (id, item) => {
  return axios.get(`${URL}/${item}/${id}`).then(({ data }) => data.article);
};

export const getArticlesByTopic = topic => {
  return axios
    .get(`${URL}/topics/${topic}/articles`)
    .then(({ data }) => data.articles);
};

export const getComments = articleID => {
  return axios
    .get(`${URL}/articles/${articleID}/comments`)
    .then(({ data }) => data.comments);
};

export const postArticle = (topic, title, body, user) => {
  return axios
    .post(`${URL}/topics/${topic}/articles`, {
      title,
      body,
      created_by: user
    })
    .then(({ data }) => data.article);
};

export const postComment = (body, userID, articleID) => {
  return axios
    .post(`${URL}/articles/${articleID}/comments`, { body, created_by: userID })
    .then(({ data }) => data.comment);
};

export const deleteComment = id => {
  return axios.delete(`${URL}/comments/${id}`).then(({ data }) => data.comment);
};

export const getAll = item => {
  return axios.get(`${URL}/${item}`).then(({ data }) => data);
};
