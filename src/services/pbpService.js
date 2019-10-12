import axios from './axios';
import { store } from './store';

function pbpService(gameId) {
  const currentDate = store.getters.getGameDate;

  const pbpApiUrl = `/json/cms/noseason/game/${currentDate}/${gameId}/pbp_all.json`;

  axios.get(pbpApiUrl).then(response => {
    let pbp = response.data.sports_content.game.play;
    store.commit('updatePbp', { gameId, pbp });

    // axios.get(`/prod/v2/${date}/scoreboard.json`).then(response => {
    //   let todaysGames = {};
    //   response.data.games.forEach(game => {
    //     const gameData = {
    //       gameId: game.gameId,
    //       isGameActivated: game.isGameActivated,
    //       statusNum: game.statusNum,
    //       clock: game.clock,
    //       startTimeUTC: game.startTimeUTC,
    //       endTimeUTC: game.endTimeUTC || '',
    //       period: game.period.current,
    //       vTeamName: game.vTeam.triCode,
    //       vTeamScore: game.vTeam.score || '0',
    //       hTeamName: game.hTeam.triCode,
    //       hTeamScore: game.hTeam.score || '0',
    //       zPlayByPlay: []
    //     };
    //     todaysGames[game.gameId] = gameData;
    //   });
    //   store.commit('addTodaysGames', todaysGames);
    // });
  });
}

export default pbpService;
