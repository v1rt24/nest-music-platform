<template>
  <ul id="slide-out" class="sidenav" ref="sidenav">
    <li @click="closeMenu" style="cursor: pointer;     padding: 10px 10px 0 30px;" title="Закрыть меню">
      <i class="small material-icons">skip_previous</i>
    </li>
    <li class="musicLogo">
      <i class="medium material-icons">library_music</i>
      Музыкальный портал
    </li>
    <li>
      <div class="divider"></div>
    </li>
    <router-link
        v-for="menu in menus"
        :key="menu.title"
        :to="{name: menu.src}"
        custom
        v-slot="{navigate, href, isExactActive}"
    >
      <li
          @click="closeMenu"
          :class="[isExactActive && 'active']"
      >
        <a :href="href" @click="navigate">{{ menu.title }}</a>
      </li>
    </router-link>
  </ul>
  <a href="#" data-target="slide-out" class="sidenav-trigger myMenu"><i class="material-icons">menu</i></a>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

let sidenavInstance = null;

export default {
  name: 'Sidebar',
  setup () {
    const sidenav = ref(null);

    const menus = [
      {title: 'Главная', src: 'Home'},
      {title: 'Список песен', src: 'TrackLists'},
    ];

    const closeMenu = () => sidenavInstance.close();

    onMounted(() => {
      sidenavInstance = M.Sidenav.init(sidenav.value);
    });

    onUnmounted(() => {
      if (sidenavInstance && sidenavInstance.destroy) {
        sidenavInstance.destroy();
      }
    });

    return {
      sidenav,
      menus,
      closeMenu,
    };
  },
};
</script>

<style scoped>
.musicLogo {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 16px 10px 8px 10px;
}

.myMenu {
  position: fixed;
  top: 10px;
  left: 30px;
}

.myMenu .material-icons {
  font-size: 38px;
  color: black;
}
</style>