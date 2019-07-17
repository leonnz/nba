import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    selectGames: []
  },
  getters: {
    getSelectedGames: state => {
      return state.selectGames;
    }
  },
  mutations: {
    addSelectedGame: (state, gameId) => {
      state.selectGames.push(gameId);
    }
  }
});
