import axios from './axios';
import { store } from './store';

function gameService() {
  axios.get('/prod/v3/today.json').then(response => {
    const date = response.data.links.currentDate;

    axios.get(`/prod/v2/${date}/scoreboard.json`).then(response => {
      let todaysGames = {};
      response.data.games.forEach(game => {
        const gameData = {
          gameId: game.gameId,
          isGameActivated: game.isGameActivated,
          statusNum: game.statusNum,
          clock: game.clock,
          startTimeUTC: game.startTimeUTC,
          endTimeUTC: game.endTimeUTC || '',
          period: game.period.current,
          vTeamName: game.vTeam.triCode,
          vTeamScore: game.vTeam.score || '0',
          hTeamName: game.hTeam.triCode,
          hTeamScore: game.hTeam.score || '0',
          zPlayByPlay: []
        };
        todaysGames[game.gameId] = gameData;
      });
      store.commit('addTodaysGames', todaysGames);
    });
  });
}

export default gameService;
