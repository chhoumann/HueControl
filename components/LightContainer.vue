<template>
  <v-container fluid style="padding: 0;">
      <v-row>
        <v-col style="padding: 0;">
          <v-row align="center" justify="center" class="grey lighten-5">
            <LightElement
            v-for="(light, index) in lights"
            v-bind:key="index"
            v-bind:light="light"
            v-on:switch-light="$emit('switch-light', light.id)"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import LightElement from './LightElement';

export default {
  name: 'LightContainer',
  components: {
    LightElement,
  },
  props: ["lights"]
}
</script>

<style scoped>

</style>
