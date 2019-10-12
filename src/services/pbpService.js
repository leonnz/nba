import axios from './axios';
import { store } from './store';

let schedule;

const startPbpService = function(gameId) {
  const currentDate = store.getters.getGameDate;

  const pbpApiUrl = `/json/cms/noseason/game/${currentDate}/${gameId}/pbp_all.json`;

  axios.get(pbpApiUrl).then(response => {
    let pbp = response.data.sports_content.game.play;
    store.commit('updatePbp', { gameId, pbp });
  });

  /**
   * Make the pbp queue manager here
   */
  schedule = setInterval(() => {
    console.log(gameId);
  }, 2000);
};

const stopPbpService = function() {
  clearInterval(schedule);
};

export { startPbpService, stopPbpService };
