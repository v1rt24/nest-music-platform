<template>
  <div class="trackProgress">
    <div class="range-field">
      <input type="range" :value="left" :min="0" :max="right" @change="$emit('rangeVal', $event)"/>
    </div>

    <div class="lineTime">
      {{ left }} / {{ right }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrackProgress',
  emits: ['rangeVal'],
  props: {
    left: Number,
    right: Number,
  },
};
</script>

<style scoped>
.trackProgress {
  display: flex;
  align-items: center;
}

.lineTime {
  width: 65px;
  margin-left: 15px;
}
</style>