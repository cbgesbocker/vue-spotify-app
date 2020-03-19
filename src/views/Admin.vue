<template>
  <div class="admin">
    <admin-welcome-card />
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="display-1">
            Recently Played Tracks
          </h2>
        </v-col>
      </v-row>

      <v-col
        cols="7"
      >
        <v-card
          v-for="(item, index) in $store.state.user.recentTracksData.items"
          :key="index"
          class="mt-4"
          outlined=""
        >
          <v-card-title>
            {{ item.track.name }}
            <v-btn
              text
              fab
              height="2.25rem"
              width="2.25rem"
              class="mr-1 ml-auto"
              @click.native="$store.commit('CLOSE_WELCOME_CARD')"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import AdminWelcomeCard from '@/components/AdminWelcomeCard.vue';
import getSpotifyClient from '../services/SpotifyClient';

export default {
  name: 'Admin',
  components: {
    AdminWelcomeCard,
  },
  async created() {
    getSpotifyClient().populateAdminData();
  },
};
</script>
