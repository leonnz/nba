import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
      // paths: ['selectedGames']
    })
  ],
  state: {
    todaysGames: [],
    selectedGames: []
  },
  getters: {
    getSelectedGames: state => {
      return state.selectedGames;
    },
    getTodaysGames: state => {
      return state.todaysGames;
    }
  },
  mutations: {
    addSelectedGame: (state, gameId) => {
      state.selectedGames.push(gameId);
    },
    removeSelectedGame: (state, index) => {
      state.selectedGames.splice(index, 1);
    },
    addTodaysGames: (state, todaysGames) => {
      state.todaysGames = todaysGames;
    }
  }
});
