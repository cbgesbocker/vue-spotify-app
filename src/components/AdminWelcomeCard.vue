<template>
  <v-container v-if="$store.state.user.profileData">
    <v-row>
      <v-col
        cols="6"
        class="mx-auto"
      >
        <transition
          name="fade"
        >
          <v-card v-if="$store.state.user.showWelcomeCard">
            <v-row
              justify="space-between"
              align="center"
              class="mx-2"
            >
              <v-card-title>
                Welcome {{ $store.state.user.profileData.display_name }}!
              </v-card-title>
              <v-btn
                text
                fab
                height="2.25rem"
                width="2.25rem"
                class="mr-1"
                @click.native="$store.commit('CLOSE_WELCOME_CARD')"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-row>
          </v-card>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
@Component
export default class AdminWelcomeCard extends Vue {

}
</script>

<style lang="scss">
.fade-item {
  display: inline-block;
  margin-right: 10px;
}
.fade-enter-active, .fade-leave-active {
  transition: all .7s;
}
.fade-enter, .fade-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(10px);
}
</style>
