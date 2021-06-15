<template>
  <div class="file-field input-field col s12">
    <div class="btn">
      <span>{{ title }}</span>
      <input type="file" :accept="accept" @change="$emit('fileFoo', $event)">
    </div>
    <div class="file-path-wrapper">
      <input class="file-path validate" type="text" :placeholder="placeholder">
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  emits: ['fileFoo'],
  props: {
    title: {
      type: String,
      default: 'Файл',
    },
    accept: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
  },
};
</script>

<style scoped>

</style>