import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/http://data.nba.net'
});

// instance.get('/prod/v3/today.json').then(response => {
//   const date = response.data.links.currentDate;
//   instance.get(`/prod/v2/${date}/scoreboard.json`).then(response => {
//     response.data.games.forEach(game => {
//       todaysGames.push(game.gameId);
//     });
//   });
// });

export default instance;
