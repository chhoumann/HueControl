<template>
  <v-app>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">

    <!-- TOP BAR -->
    <TopBar v-on:switch-all="switchAll" />

    <v-content>
      <LightContainer v-bind:lights="lights" v-on:switch-light="switchLight" />
      <TabbedLights v-bind:lights="lights" />
    </v-content>

  </v-app>
</template>

<script>
import TopBar from '../components/TopBar';
import LightContainer from '../components/LightContainer';
import TabbedLights from '../components/TabbedLights';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  data () {
    return {
      lights: [],
    }
  },
  created() {
    const getLights = async () => {
      try {
        const { data } = await axios.get('/getAllLights');
        this.lights = data;
      } catch (error) {}
    }
    getLights()
  },
  methods: {
    async switchLight(id) {
      const { data } = await axios.get('/switchLight', {params: {id}});
      this.lights[id - 1].on = data;
    },
    async switchAll() {
      const lightIDs = this.lights.map(light => light.id)
      lightIDs.forEach(id => this.switchLight(id));
    }
  },
  components: {
    TopBar,
    LightContainer,
    TabbedLights,
  }
}
</script>
