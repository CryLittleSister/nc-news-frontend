import axios from "axios";

const URL = "https://tg-northcoders-news.herokuapp.com/api";

export const handleVote = (id, direction, item) => {
  return axios
    .put(`${URL}/${item}/${id}?vote=${direction}`)
    .then(data => data.data);
};

export const getSingleItem = (id, item) => {
  return axios.get(`${URL}/${item}/${id}`).then(data => data.data.article);
};
