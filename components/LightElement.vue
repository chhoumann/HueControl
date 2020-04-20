<template>
  <div>
    <v-card class="ma-3 pa-6" @click="$emit('switch-light', light.id)">
      <v-container>
        <v-row justify="center">
          <v-col cols="auto">
            <v-icon x-large v-if="light.on">far fa-lightbulb</v-icon>
            <v-icon x-large v-if="!light.on">fas fa-lightbulb</v-icon>
          </v-col>
          <v-card-title>Light {{light.id}}</v-card-title>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LightElement',
  props: ["light"],
  methods: {},
  data() {
    return {
      show: false,
    }
  }
}
</script>

<style scoped>
* {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
