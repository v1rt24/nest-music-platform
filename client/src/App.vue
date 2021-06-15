<template>
  <Sidebar/>
  <div class="container myContainer">
    <router-view/>
  </div>
  <Player/>
</template>

<script>
import Sidebar from './components/Sidebar';
import Player from './components/Track/Player';

export default {
  name: 'App',
  components: {Player, Sidebar},
};
</script>

<style scoped>
.myContainer {
  padding: 50px 0;
}
</style>