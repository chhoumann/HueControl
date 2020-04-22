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
          <br>
          <h2>Hue</h2>
          <vue-slider
          :disabled="light.on ? false : true"
          :min="0"
          :max="65535"
          width="75%"
          height="2rem"
          :dotSize="40"
          :dragOnClick="true"
          v-model="light.hue"
          :lazy="true"
          @change="$emit('hue-change', light.hue, light.id)"
          ></vue-slider>

          <h2>Brightness</h2>
          <vue-slider
          :disabled="light.on ? false : true"
          :min="0"
          :max="254"
          width="75%"
          height="2rem"
          :dotSize="40"
          :dragOnClick="true"
          v-model="light.bri"
          :lazy="true"
          @change="$emit('bri-change', light.bri, light.id)"
          ></vue-slider>

          <h2>Saturation</h2>
          <vue-slider
          :disabled="light.on ? false : true"
          :min="0"
          :max="254"
          width="75%"
          height="2rem"
          :dotSize="40"
          :dragOnClick="true"
          v-model="light.sat"
          :lazy="true"
          @change="$emit('sat-change', light.sat, light.id)"
          ></vue-slider>
        </v-card>
      </v-tab-item>
      <PredefinedColors />
    </v-tabs-items>
  </v-card>
</template>

<script>
// import component
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import PredefinedColors from './PredefinedColors'

// import theme
import 'vue-slider-component/theme/default.css'

export default {
  name: "TabbedLights",
  props: ["lights"],
  components: {
    VueSlider,
    PredefinedColors,
  },
  data() {
    return {
      tab: null,
    }
  }
}
</script>

<style scoped>

</style>
