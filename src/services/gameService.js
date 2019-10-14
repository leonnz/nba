import axios from './axios';
import { store } from './store';

const initGameService = function() {
  axios.get('/prod/v3/today.json').then(response => {
    // const date = response.data.links.currentDate;
    const date = '20191011';

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

const numberUnfinishedGames = function(todaysGames) {
  let unfinishedGames = 0;

  for (var key in todaysGames) {
    if (todaysGames[key].statusNum !== 3) {
      unfinishedGames++;
    }
  }

  return unfinishedGames;
};

const updateGameService = function() {
  axios.get('/prod/v3/today.json').then(response => {
    // const date = response.data.links.currentDate;
    const date = '20191011';
    store.commit('addGameDate', date);

    const todaysGames = store.getters.getTodaysGames;

    if (numberUnfinishedGames(todaysGames) > 0) {
      setInterval(() => {
        axios.get(`/prod/v2/${date}/scoreboard.json`).then(response => {
          response.data.games.forEach(game => {
            const gameStore = store.getters.getTodaysGames[game.gameId];

            let updateGamePayload = { gameId: game.gameId };

            if (game.isGameActivated !== gameStore.isGameActivated) {
              updateGamePayload.isGameActivated = game.isGameActivated;
            }
            if (game.statusNum !== gameStore.statusNum) {
              updateGamePayload.statusNum = game.statusNum;
            }
            if (game.clock !== gameStore.clock) {
              updateGamePayload.clock = game.clock;
            }
            if (game.endTimeUTC !== gameStore.endTimeUTC) {
              updateGamePayload.endTimeUTC = game.endTimeUTC;
            }
            if (game.period.current !== gameStore.period) {
              updateGamePayload.period = game.period;
            }
            if (game.vTeam.score !== gameStore.vTeamScore) {
              updateGamePayload.vTeamScore = game.vTeam.score;
            }
            if (game.hTeam.score !== gameStore.hTeamScore) {
              updateGamePayload.hTeamScore = game.hTeam.score;
            }
            if (Object.keys(updateGamePayload).length > 1) {
              store.commit('updateGame', updateGamePayload);
            }
          });
        });
        console.log('this ran');
      }, 5000);
    }
  });
};

export { initGameService, updateGameService };
