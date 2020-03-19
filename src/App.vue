<template>
  <v-app
    id="app"
  >
    <v-card
      color="grey lighten-4"
      flat
      tile
    >
      <v-toolbar>
        <v-toolbar-title>Vue Music App</v-toolbar-title>

        <v-spacer />

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon>
              <v-icon v-on="on">
                mdi-heart
              </v-icon>
            </v-btn>
          </template>
          <span>Like</span>
        </v-tooltip>

        <template v-if="$store.state.auth.userSignedIn">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon>
                <v-icon v-on="on">
                  mdi-logout
                </v-icon>
              </v-btn>
            </template>
            <span>Login</span>
          </v-tooltip>
        </template>
        <template v-else>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :href="spotifyClient.getAuthorizationUrl()"
              >
                <v-icon
                  v-on="on"
                >
                  mdi-login
                </v-icon>
              </v-btn>
            </template>
            <span>Login</span>
          </v-tooltip>
        </template>
      </v-toolbar>
    </v-card>
    <router-view />
  </v-app>
</template>


<script lang="ts">

import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import getSpotifyClient from '@/services/SpotifyClient';

@Component
export default class App extends Vue {
  spotifyClient = getSpotifyClient();

  navItems = [
    {
      to: '/',
      text: 'Home',
    },
  ]
}

</script>

<style lang="scss">
body {
  font-family: 'Roboto';
}
</style>
