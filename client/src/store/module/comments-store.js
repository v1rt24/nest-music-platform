const URL = process.env.VUE_APP_URL;

export default {
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {
    setComments (state, comments) {
      state.comments = comments;
    },
    setAddComment (state, comment) {
      state.comments.push(comment);
    },
  },
  actions: {
    async createComment ({commit}, comment) {
      try {
        const resData = await fetch(`${URL}/tracks/comment`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(comment),
        });

        const res = await resData.json();

        if (!resData.ok) {
          throw res;
        }

        return res;
      }
      catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};