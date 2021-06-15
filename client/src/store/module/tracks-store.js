const URL = process.env.VUE_APP_URL;

export default {
  namespaced: true,
  state: () => ({
    tracks: [],
    track: null,
  }),
  getters: {
    getTracks: state => state.tracks,
    getTrack: state => state.track,
    getIdTrack: state => id => state.tracks.find(tr => tr.id === +id),
  },
  mutations: {
    setTracks (state, tracks) {
      state.tracks = tracks;
    },
    setPlayerTrack (state, track) {
      state.track = track;
    },
  },
  actions: {
    async loadTracks ({commit}) {
      try {
        const res = await fetch(`${URL}/tracks?count=10&offset=0`);
        commit('setTracks', await res.json());
      }
      catch (error) {
        console.error(error);
        throw error;
      }
    },
    async createTrack ({}, payload) {
      try {
        const fd = new FormData();
        fd.append('name', payload.name);
        fd.append('artist', payload.artist);
        fd.append('text', payload.text);
        fd.append('picture', payload.picture);
        fd.append('audio', payload.audio);

        await fetch(`${URL}/tracks`, {
          method: 'POST',
          body: fd,
        });
      }
      catch (error) {
        console.log(error);
        throw error;
      }
    },
    async loadTrackId ({}, id) {
      try {
        const res = await fetch(`${URL}/tracks/${id}`);
        return await res.json();
      }
      catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};