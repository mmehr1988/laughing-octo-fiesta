import axios from 'axios';

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter

export const searchGoogleBooks = async (query) => {
  return axios
    .get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query,
      },
    })
    .then(function (response) {
      return response.data.items;
    })
    .catch(function (error) {
      console.log(error);
    });
};
