const URL = process.env.VUE_APP_URL;

export default {
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    async search ({}, req) {
      try {
        console.log(req);
        const res = await fetch(`${URL}/tracks/search?query=${req}`);
        console.log(await res.json());
      }
      catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};