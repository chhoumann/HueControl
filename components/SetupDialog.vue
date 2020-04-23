<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <!-- <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn> -->
          <v-toolbar-title>HueControl Setup</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="4" align="center" justify="center">
              <h1 class="header">Click your Hue Bridge button now.</h1>
              <p>When you have done so, please click the button below to continue.</p>
              <v-spacer></v-spacer>
              <v-btn
              x-large
              color="success"
              v-bind:loading="!foundBridge"
              v-bind:disable="!foundBridge"
              @click="dialog=false; $emit('load-page', foundBridge)"> Continue </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SetupDialog',
  props: ['hasRunSetup'],
  created() {
    // When this component is loaded (which only happens if the user hasn't run the setup),
    // we should keep waiting for the bridge to be found and the userData.json file to be
    // created. Will call itself until found; then the 'Continue' button unlocks.
    (async () => {
      const lookForBridge = async () => {
        if (!this.foundBridge) {
          setTimeout(async () => {
            try {
              const {data: {readyStatus}} = await axios.get('/getBridgeClient');
              this.foundBridge = readyStatus;
              await lookForBridge();
            } catch (error) {}
          }, 150);
        }
      }
      await lookForBridge();
    })();
  },
  data () {
    return {
      dialog: true,
      foundBridge: false,
    }
  },
}
</script>

<style>

</style>
