import { createStore } from 'vuex';

import player from './module/player-store';
import tracks from './module/tracks-store';
import comments from './module/comments-store';
import search from './module/search-store';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    player,
    tracks,
    comments,
    search,
  },
});
