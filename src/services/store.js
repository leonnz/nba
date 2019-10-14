import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    gameDate: '',
    todaysGames: {},
    selectedGames: []
  },
  getters: {
    getGameDate: state => {
      return state.gameDate;
    },
    getSelectedGames: state => {
      return state.selectedGames;
    },
    getTodaysGames: state => {
      return state.todaysGames;
    },
    getGamePbp: state => gameId => {
      // console.log(state.todaysGames[gameId]);
      return state.todaysGames[gameId].zPlayByPlay.reverse();
    }
  },
  mutations: {
    addGameDate: (state, gameDate) => {
      state.gameDate = gameDate;
    },
    addSelectedGame: (state, gameId) => {
      state.selectedGames.push(gameId);
    },
    removeSelectedGame: (state, index) => {
      state.selectedGames.splice(index, 1);
    },
    addTodaysGames: (state, todaysGames) => {
      state.todaysGames = todaysGames;
    },
    updateGame: (state, data) => {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          console.log(data[key]);
        }
      }
    },
    updatePbp: (state, data) => {
      state.todaysGames[data.gameId].zPlayByPlay = data.pbp;
    }
  }
});
