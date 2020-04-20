<template>

  <v-app-bar
    fixed
    app
    color="deep-purple accent-4"
    dense
    dark
  >
    <v-app-bar-nav-icon @click="$emit('switch-all')"><v-icon>far fa-lightbulb</v-icon></v-app-bar-nav-icon>

    <v-toolbar-title class="headline">HueControl</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-icon class="socialIcon" @click="gotoLinkedInPage">fab fa-linkedin</v-icon>
    <v-icon class="socialIcon" @click="gotoGithubPage">fab fa-github</v-icon>
    <v-icon class="socialIcon" @click="gotoWebsite">fas fa-address-card</v-icon>

  </v-app-bar>

</template>

<script>
export default {
  name: "TopBar",
  methods: {
    gotoGithubPage() { window.open('https://github.com/chhoumann', '_blank') },
    gotoLinkedInPage() { window.open('https://www.linkedin.com/in/christian-bager-bach-houmann-02683a146/', '_blank') },
    gotoWebsite() { window.open('https://bagerbach.com/', '_blank') },
  }
}
</script>

<style scoped>
  .socialIcon {
    margin-right: 1rem;
  }
</style>
