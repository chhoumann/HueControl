<template>
  <v-app>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">

    <!-- TOP BAR -->
    <TopBar v-on:switch-all="switchAll" />

    <v-content>
      <LightContainer
      v-bind:lights="lights"
      v-on:switch-light="switchLight" />

      <TabbedLights
      v-bind:lights="lights"
      v-on:hue-change="hueChange"
      v-on:bri-change="brightnessChange"
      v-on:sat-change="saturationChange" />
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
    },
    async hueChange(newHue, id) { await axios.get('/hueChange', { params: { newHue, id }}) },
    async brightnessChange(newBrightness, id) { await axios.get('/brightnessChange', {params: {newBrightness, id}}) },
    async saturationChange(newSaturation, id) { await axios.get('/saturationChange', {params: {newSaturation, id}}) },
  },
  components: {
    TopBar,
    LightContainer,
    TabbedLights,
  }
}
</script>
