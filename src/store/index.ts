import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      authKey: '',
    },
    user: {
      profileData: null,
      showWelcomeCard: true,
      recentTracksData: {
        items: [],
      },
    },
    uiState: {
      likedSongs: [],
    },
  },
  mutations: {
    SET_AUTH_KEY: (state, payload) => {
      state.auth.authKey = payload;
    },
    SET_PROFILE_DATA: (state, payload) => {
      state.user.profileData = payload;
    },
    CLOSE_WELCOME_CARD: (state) => {
      state.user.showWelcomeCard = false;
    },
    SET_MY_RECENT_TRACKS_DATA: (state, payload) => {
      state.user.recentTracksData = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
