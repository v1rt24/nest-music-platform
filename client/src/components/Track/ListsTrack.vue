<template>
  <ul class="collection">
    <list-track-item
        v-for="track in tracksList"
        :key="track.title"
        :track-item="track"
    />
  </ul>
</template>

<script>
import { computed } from 'vue';
import ListTrackItem from './ListTrackItem';

export default {
  name: 'ListsTrack',
  props: {
    tracksList: {
      type: Array,
      required: true,
    },
  },
  components: {ListTrackItem},
};
</script>

<style scoped>

</style>