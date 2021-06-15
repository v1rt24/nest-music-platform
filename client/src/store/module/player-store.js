export default {
  namespaced: true,
  state: () => ({
    dataTrack: {
      currentTime: 0,
      duration: 0,
      active: null,
      volume: 20,
      pause: true,
    },
  }),
  getters: {
    getDataTrack: state => state.dataTrack,
  },
  mutations: {
    setDataTrack (state, payload = {key: '', val: null}) {
      switch (payload.key) {
        case 'pause':
          state.dataTrack.pause = true;
          break;
        case 'play':
          state.dataTrack.pause = false;
          break;
        case 'volume':
          state.dataTrack.volume = payload.val;
          break;
        case 'currentTime':
          state.dataTrack.currentTime = payload.val;
          break;
        case 'duration':
          state.dataTrack.duration = payload.val;
          break;
        case 'endTrack':
          state.dataTrack.pause = true;
          state.dataTrack.currentTime = 0;
          break;
      }
    },
  },
  actions: {},
};