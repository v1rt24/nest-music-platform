<template>
  <div class="row">
    <div class="col s12">
      <div class="card pageTrack">
        <div class="card-content">
          <h4>Список песен</h4>
          <button class="waves-effect waves-teal btn-flat" @click="$router.push({name: 'CreateTrack'})">
            Загрузить
          </button>
        </div>

        <div class="input-field col s12">
          <input id="search" type="text" v-model.trim="search" @keydown.enter="searchHandler">
          <label for="search">Поиск</label>
        </div>

        <ListsTrack :tracks-list="listsTrack"/>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import ListsTrack from '../components/Track/ListsTrack';

export default {
  name: 'TrackLists',
  setup () {
    // data
    const store = useStore();
    const listsTrack = ref([]);
    const search = ref('');

    // computed
    // methods
    const searchHandler = async () => {
      if (search.value.length < 3) {
        return;
      }
      await store.dispatch('search/search', search.value);
    };

    // hooks
    onMounted(async () => {
      listsTrack.value = store.getters['tracks/getTracks'];
    });

    // template
    return {
      listsTrack,
      search,
      searchHandler,
    };
  },
  components: {ListsTrack},
};
</script>

<style scoped>
.pageTrack .card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>