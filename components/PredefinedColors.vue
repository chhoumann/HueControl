<template>
  <div class="columns" align="center">
      <v-container>
        <v-btn
        class="my-2 mx-2"
        color="info"
        x-large
        @click="changeToColor(color)"
        v-for="color in colors"
        :key="color.name">{{ color.name }}</v-btn>
      </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PredefinedColors',
  props: ['light'],
  data() {
    return {
      colors: [
        {name: "White", colorDetails: { hue: 42413, sat: 84, bri: 254}},
        {name: "Red", colorDetails: { hue: 65535, sat: 254, bri: 254}},
        {name: "Yellow", colorDetails: { hue: 52349, sat: 21, bri: 254}},
        {name: "Purple", colorDetails: { hue: 47563, sat: 213, bri: 254}},
        {name: "Light Orange", colorDetails: { hue: 6204, sat: 197, bri: 254}},
        {name: "Grey", colorDetails: { hue: 42495, sat: 124, bri: 254}}]
    }
  },
  methods: {
    changeToColor: async function(color) {
      const {hue, sat, bri} = color["colorDetails"];
      axios.post('/changeToColor', {
        id: this.light.id,
        hue, sat, bri
      })
      this.light.hue = hue;
      this.light.sat = sat;
      this.light.bri = bri;
    },
  }
}
</script>

<style scoped>

</style>
