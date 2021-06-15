<template>
  <h1>Загрузить песню</h1>

  <div class="row">
    <form enctype="multipart/form-data" class="col s12" @submit.prevent="createTrack">
      <div class="row">
        <div class="input-field col s12">
          <input id="name" type="text" v-model.trim="name">
          <label for="name">Название песни</label>
        </div>

        <div class="input-field col s12">
          <input id="artist" type="text" v-model.trim="artist">
          <label for="artist">Исполнитель</label>
        </div>

        <div class="input-field col s12">
          <input id="text" type="text" v-model.trim="text">
          <label for="text">Текст песни</label>
        </div>

        <FileUpload
            accept="image/*"
            placeholder="Загрузить обложку"
            @fileFoo="fileImage"
        />

        <FileUpload
            accept="audio/*"
            placeholder="Загрузить аудио файл"
            @fileFoo="fileAudio"
        />
      </div>

      <button class="btn waves-effect waves-light" type="submit">Создать</button>
    </form>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import FileUpload from '../components/Track/FileUpload';

export default {
  name: 'CreateTrack',
  components: {FileUpload},
  setup () {
    const store = useStore();
    const router = useRouter();
    const formData = reactive({
      name: '',
      artist: '',
      text: '',
      picture: '',
      audio: '',
    });

    const fileImage = (e) => {
      formData.picture = e.target.files[0];
    };

    const fileAudio = (e) => {
      formData.audio = e.target.files[0];
    };

    const createTrack = async () => {
      try {
        await store.dispatch('tracks/createTrack', formData);
        router.push({
          name: 'TrackLists',
        });
      }
      catch (error) {}
    };

    return {
      ...toRefs(formData),
      fileImage,
      fileAudio,
      createTrack,
    };
  },
};
</script>

<style scoped>

</style>