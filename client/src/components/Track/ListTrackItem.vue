<template>
  <li class="collection-item" @click.self="$router.push({name: 'Track', params: {id: trackItem.id}})">
    <button class="btn-flat" @click="changeAsd">
      <span class="material-icons" v-if="!playAction">play_arrow</span>
      <span class="material-icons" v-else>pause</span>
    </button>
    <div>
      <img :src="`${HOST}/${trackItem.picture}`" :alt="trackItem.name" width="60">
    </div>

    <div class="nameTrack">
      <p>{{ trackItem.name }}</p>
      <p style="color: #a7a6a6;">{{ trackItem.artist }}</p>
    </div>

    <div class="timeTrack" v-if="playAction">
      02:42 / 03:22
    </div>

    <button class="waves-effect waves-teal btn-flat" style="margin-left: auto;">
      <span class="material-icons">delete</span>
    </button>
  </li>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ListTrackItem',
  props: {
    trackItem: {
      type: Object,
      required: true,
    },
  },
  setup (props) {
    // data
    const store = useStore();
    const playAction = ref(false);

    // computed
    // methods
    const changeAsd = () => {
      store.commit('tracks/setPlayerTrack', props.trackItem);
      playAction.value = !playAction.value;
    };

    // hooks
    // template
    return {
      HOST: ref(process.env.VUE_APP_HOST),
      playAction,
      changeAsd,
    };
  },
};
</script>

<style scoped>
.collection-item {
  display: flex;
  align-items: center;
}

.btn-flat {
  display: flex;
  align-items: center;
}

.nameTrack {
  width: 200px;
  margin-left: 15px;
}

.nameTrack p {
  margin: 0;
}
</style>