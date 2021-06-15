<template>
  <div class="collection-item" :key="listTrack" v-if="listTrack">
    <div class="controlPlayer">
      <button class="btn-flat" @click="playAction = !playAction">
        <span class="material-icons" v-if="playAction">play_arrow</span>
        <span class="material-icons" v-else>pause</span>
      </button>

      <div>
        <img :src="`${URL}/${listTrack.picture}`" :alt="listTrack.name" width="60">
      </div>

      <div class="nameTrack">
        <p>{{ listTrack.name }}</p>
        <p style="color: #a7a6a6;">{{ listTrack.artist }}</p>
      </div>
    </div>

    <TrackProgress :left="dataTrackActions.currentTime" :right="dataTrackActions.duration" @rangeVal="changeTime"/>

    <div class="trpVolume">
      <div class="volume" @click="mute = !mute"><span class="material-icons">{{ volumeImg }}</span></div>
      <TrackProgress :left="mute ? 0 : dataTrackActions.volume" :right="100" @rangeVal="changeVolume"/>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useStore } from 'vuex';
import TrackProgress from './TrackProgress';

export default {
  name: 'Player',
  components: {TrackProgress},
  setup () {
    // data
    const URL = process.env.VUE_APP_HOST;
    const store = useStore();
    const playAction = ref(null);
    const mute = ref(false);
    let audio = null;

    // computed
    const dataTrackActions = computed(() => store.getters['player/getDataTrack']);
    const volumeImg = computed(() => dataTrackActions.value.volume > 0 && !mute.value ? 'volume_up' : 'volume_off');
    const listTrack = computed(() => store.getters['tracks/getTrack']);

    // methods
    const changeVolume = (e) => {
      const vol = +e.target.value;

      store.commit('player/setDataTrack', {key: 'volume', val: vol});
      audio.volume = vol / 100;

      mute.value = false;
    };

    const changeTime = (e) => {
      const time = +e.target.value;

      store.commit('player/setDataTrack', {key: 'currentTime', val: time});
      audio.currentTime = time;
    };

    watch(listTrack, track => {
      if (track) {
        audio.src = `${URL}/${track.audio}`;
        audio.volume = dataTrackActions.value.volume / 100;
        playAction.value = dataTrackActions.value.pause;

        audio.onloadedmetadata = () => {
          store.commit('player/setDataTrack', {key: 'duration', val: Math.ceil(audio.duration)});
        };

        audio.ontimeupdate = () => {
          store.commit('player/setDataTrack', {key: 'currentTime', val: Math.ceil(audio.currentTime)});
        };

        audio.onended = () => {
          store.commit('player/setDataTrack', {key: 'endTrack'});
          playAction.value = true;
        };
      }
    });

    watch(playAction, value => {
      if (value) {
        audio.pause();
        store.commit('player/setDataTrack', {key: 'pause'});
      }
      else {
        audio.play();
        store.commit('player/setDataTrack', {key: 'play'});
      }
    });

    watch(mute, value => {
      if (value) {
        audio.volume = 0;
      }
      else {
        audio.volume = dataTrackActions.value.volume / 100;
      }
    });

    // hooks
    onMounted(() => {
      audio = new Audio();
    });
    // template
    return {
      dataTrackActions,
      listTrack,
      playAction,
      volumeImg,
      mute,
      changeVolume,
      changeTime,
      URL,
    };
  },
};
</script>

<style scoped>
.material-icons {
  display: block;
}

.collection-item {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: aliceblue;
}

.controlPlayer {
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

.trpVolume {
  display: flex;
  align-items: center;
}

.volume {
  cursor: pointer;
}
</style>