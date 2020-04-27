<template>
  <v-app>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">

    <!-- TOP BAR -->
    <TopBar v-on:switch-all="switchAll" />

    <setupDialog v-if="!hasRunSetup" v-on:load-page="loadPage" />
    <v-content v-else>
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
import SetupDialog from '../components/SetupDialog';
import LightContainer from '../components/LightContainer';
import TabbedLights from '../components/TabbedLights';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';


export default {
  data () {
    return {
      hasRunSetup: false,
      lights: [],
    }
  },
  async created() {
    // When app is created, see if bridge is connected.
    try {
      const {data: {readyStatus}} = await axios.get('/getBridgeClient');
      this.hasRunSetup = readyStatus;
    } catch (error) {}

    // If the bridge is connected, we're free to get the lights.
    if (this.hasRunSetup) await this.getLights()
  },
  methods: {
    async getLights() {
      try {
        const { data } = await axios.get('/getAllLights');
        this.lights = data;
      } catch (error) {}
    },
    async switchLight(id) {
      const { data } = await axios.get('/switchLight', {params: {id}});
      this.lights[id - 1].on = data;
    },
    async switchAll() {
      const lightIDs = this.lights.map(light => light.id)
      lightIDs.forEach(id => this.switchLight(id));
    },
    async hueChange(newHue, id) {
      await axios.post('/hueChange', { newHue, id });
      this.lights[id - 1].hue = newHue;
    },
    async brightnessChange(newBrightness, id) {
      await axios.post('/brightnessChange', { newBrightness, id });
      this.lights[id - 1].bri = newBrightness;
    },
    async saturationChange(newSaturation, id) {
      await axios.post('/saturationChange', { newSaturation, id });
      this.lights[id - 1].sat = newSaturation;
    },
    async loadPage() {
      await this.getLights();
      this.hasRunSetup = true;
    },
  },
  components: {
    TopBar,
    LightContainer,
    TabbedLights,
    SetupDialog,
  }
}
</script>
