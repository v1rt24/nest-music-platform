<template>
  <div class="singleTrack" v-if="trackData">
    <button class="waves-effect waves-light btn-small back" @click="$router.back()">Назад</button>
    <div class="imgName">
      <div class="imgSong"><img :src="`${HOST}/${trackData.picture}`" :alt="trackData.name"></div>
      <div class="imgName__info">
        <p>Исполнитель: <strong>{{ trackData.artist }}</strong></p>
        <p>Название песни: <strong>{{ trackData.name }}</strong></p>
        <p>Прослушиваний: <strong>{{ trackData.listens }}</strong></p>
      </div>
    </div>
    <div class="textPesny">
      <p class="textSongPar">Текст песни</p>
      <div class="textSong">{{ trackData.text }}</div>
    </div>

    <div class="row">
      <h4>Комментарии</h4>
      <form class="col s12" @submit.prevent="commentHandler">
        <div class="row">
          <div class="input-field col s12">
            <input id="name" type="text" v-model.trim="username">
            <label for="name">Ваше имя</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="textarea1" class="materialize-textarea" v-model.trim="text"></textarea>
            <label for="textarea1">Textarea</label>
          </div>
        </div>

        <button type="submit" class="waves-effect waves-light btn-small">Прокомментировать</button>
      </form>
    </div>

    <div>
      <div
          v-for="com in trackData.comments"
          :key="com.id"
          class="comment"
      >
        <p>{{ com.username }}</p>
        <p>{{ com.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, queuePostFlushCb, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Track',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    // data
    const store = useStore();
    const trackData = ref(null);
    const HOST = process.env.VUE_APP_HOST;

    const formData = reactive({
      username: '',
      text: '',
      track_id: +props.id,
    });

    // computed
    // methods
    const commentHandler = async () => {
      try {
        const res = await store.dispatch('comments/createComment', formData);
        await trackData.value.comments.push(res);
        console.log('Комментарий добавлен');
      }
      catch (error) {}
    };

    // hooks
    onMounted(async () => {
      trackData.value = await store.dispatch('tracks/loadTrackId', props.id);
    });

    // template
    return {
      HOST,
      trackData,
      ...toRefs(formData),
      commentHandler,
    };
  },
};
</script>

<style scoped>
.back {
  margin-bottom: 30px;
}

.imgName {
  display: flex;
  align-items: center;
}

.imgSong {
  width: 128px;
}

.imgName__info {
  margin-left: 15px;
}

.imgName__info p {
  margin: 0;
}

.textSongPar {
  font-size: 20px;
}

.textSong p {
  margin: 0;
}

.comment {
  border: 1px solid black;
  padding: 0 10px;
  margin: 10px 0;
}
</style>