<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="GPL__toolbar" style="height: 60px">
        <q-toolbar-title class="row items-center no-wrap">
          <img src="~/assets/ABS.png" style="height: 40px" />
          <div class="title_name">
            <span class="q-ml-sm q-mr-xl">Ascenders Business Services</span>
          </div>
          <q-separator vertical class="bg-deep-red-1" />

          <div class="q-ml-md q-gutter-x-xs gt-sm">
            <q-btn
              flat
              class="push text-overline text-white no-wrap"
              label="Home"
              to="/"
            />
            <q-btn
              flat
              class="text-overline text-white no-wrap"
              label="Employee"
              to="/employee"
            />
            <q-btn
              flat
              class="text-overline text-white no-wrap"
              label="Manager"
              to="/manager"
            />
          </div>
        </q-toolbar-title>

        <!------------------------profile----------------------------->
        <div class="q-gutter-sm row items-center no-wrap gt-sm">
          <q-tooltip>Menu</q-tooltip>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu">
          </q-btn>
        </div>
        <!----------------------------------------------------  ----->
        <div class="lt-md">
          <q-btn
            flat
            dense
            round
            @click="drawer = !drawer"
            aria-label="Menu"
            icon="menu"
            class="q-mx-md"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      class="bg-grey-3"
      side="right"
      show-if-above
      :width="200"
      :breakpoint="500"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>

            <q-item-section> Manage Admin </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="file_upload" />
            </q-item-section>

            <q-item-section> Import File </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="file_download" />
            </q-item-section>

            <q-item-section> Export File </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div class="q-pa-sm absolute-top" style="height: 150px">
        <div class="row justify-center">
          <q-avatar size="80px" class="q-mb-sm">
            <img src="~assets/ABS.png" class="q-pb-sm" />
          </q-avatar>
        </div>
        <div class="text-weight-bold" style="text-align: center">
          Abdulbasit, Arifah U.
        </div>
        <div class="row justify-center">Admin</div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      drawer: ref(false),
    };
  },
};
</script>

<style></style>
