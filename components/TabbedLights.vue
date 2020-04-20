<template>
  <v-card flat>
    <v-tabs grow v-model="tab">
      <v-tab v-for="light in lights" :key="light.id">
        Light {{ light.id }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="light in lights" :key="light.id">
        <v-card align="center" flat>
          <!-- <h1 class="display-2" id="header">Controls for Light {{ light.id }}</h1>
          <v-divider></v-divider> -->
          <br>
          <h2>Hue</h2>
          <vue-slider
          :min="0"
          :max="65535"
          width="75%"
          height="2rem"
          :dotSize="40"
          :dragOnClick="true"
          v-model="light.hue"
          ></vue-slider>

          <h2>Brightness</h2>
          <vue-slider
          :min="0"
          :max="254"
          width="75%"
          height="2rem"
          :dotSize="40"
          :dragOnClick="true"
          v-model="light.bri"
          ></vue-slider>

          <h2>Saturation</h2>
          <vue-slider
          :min="0"
          :max="254"
          width="75%"
          height="2rem"
          :dotSize="40"
          :dragOnClick="true"
          v-model="light.sat"
          ></vue-slider>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
// import component
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'

// import theme
import 'vue-slider-component/theme/default.css'

export default {
  name: "TabbedLights",
  props: ["lights"],
  components: {
    VueSlider,
  },
  data() {
    return {
      tab: null,
      briVal: 0,
      hueVal: 0,
      satVal: 0,
    }
  }
}
</script>

<style scoped>
  .slider {
    width: 50%;
  }
</style>
