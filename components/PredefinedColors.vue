<template>
  <div class="columns">
      <v-container>
        <v-card v-for="color in colors" :key="color">
          <h1 align="center">{{ color }}</h1>
        </v-card>
      </v-container>
  </div>
</template>

<script>
export default {
  name: 'PredefinedColors',
  props: ["light"],
  data() {
    return {
      colors: ["White", "Red", "Blue"]
    }
  },
  methods: {

  }
}
</script>

<style scoped>
h1 {
  color: decimal(65535)
}
</style>
