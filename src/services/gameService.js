import axios from './axios';
import { store } from './store';
import { Array } from 'core-js';

const initGameService = function() {
  axios.get('/prod/v3/today.json').then(response => {
    const date = response.data.links.currentDate;
    // const date = '20191011';

    store.commit('addGameDate', date);

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
};

const unfinishedGames = function(todaysGames) {
  let unfinishedGames = {};

  for (var key in todaysGames) {
    if (todaysGames[key].statusNum == 3) {
      unfinishedGames[key] = todaysGames[key];
    }
  }
  return unfinishedGames;
};

const updateGameService = function() {
  axios.get('/prod/v3/today.json').then(response => {
    const date = response.data.links.currentDate;

    const todaysGames = store.getters.getTodaysGames;

    const schedule = setInterval(() => {
      const games = unfinishedGames(todaysGames);
      if (Object.keys(games).length > 0) {
        for (var gameId in games) {
          let pbpApiUrl = `/json/cms/noseason/game/${date}/${gameId}/pbp_all.json`;
          axios.get(pbpApiUrl).then(response => {
            // console.log(response.data);
            let gameId = response.data.sports_content.game.id;
            let pbp = response.data.sports_content.game.play;

            store.commit('updatePbp', { gameId, pbp });
            // console.log(store.getters.getGamePbp(gameId));
            // console.log(store.getters.getGamePbp(gameId));
            // response.data.games.forEach(game => {
            //   const gameStore = store.getters.getTodaysGames[game.gameId];

            //   let updateGamePayload = { gameId: game.gameId };

            //   if (game.isGameActivated !== gameStore.isGameActivated) {
            //     updateGamePayload.isGameActivated = game.isGameActivated;
            //   }
            //   if (game.statusNum !== gameStore.statusNum) {
            //     updateGamePayload.statusNum = game.statusNum;
            //   }
            //   if (game.clock !== gameStore.clock) {
            //     updateGamePayload.clock = game.clock;
            //   }
            //   if (game.endTimeUTC !== gameStore.endTimeUTC) {
            //     updateGamePayload.endTimeUTC = game.endTimeUTC;
            //   }
            //   if (game.period.current !== gameStore.period) {
            //     updateGamePayload.period = game.period;
            //   }
            //   if (game.vTeam.score !== gameStore.vTeamScore) {
            //     updateGamePayload.vTeamScore = game.vTeam.score;
            //   }
            //   if (game.hTeam.score !== gameStore.hTeamScore) {
            //     updateGamePayload.hTeamScore = game.hTeam.score;
            //   }
            //   if (Object.keys(updateGamePayload).length > 1) {
            //     store.commit('updateGame', updateGamePayload);
            //   }
            // });
          });
        }
      } else {
        clearInterval(schedule);
      }
    }, 2000);
  });
};

export { initGameService, updateGameService };
