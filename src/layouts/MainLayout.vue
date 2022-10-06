<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="GPL__toolbar" style="height: 60px">
        <q-toolbar-title class="row items-center no-wrap">
          <img src="~/assets/ABS.png" style="height: 40px" />
          <div class="title_name">
            <span class="q-ml-sm q-mr-lg">Ascenders Business Services</span>
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
          </div>
        </q-toolbar-title>

        <!------------------------profile----------------------------->
        <div class="q-gutter-sm row items-center no-wrap gt-sm">
          <q-tooltip>Account</q-tooltip>
          <q-btn-dropdown round flat dropdown-icon="account_circle" size="20px">
            <div class="q-pa-md">
              <div class="row justify-center">
                <q-avatar size="80px" class="q-mb-sm">
                </q-avatar>
              </div>
              <div class="text-weight-bold" style="text-align: center">
                {{ }}
              </div>
              <div class="text-caption" style="text-align: center">
                {{ }}
              </div>
              <div class="row justify-center">
                <q-btn
                  push
                  dense
                  class="q-mt-sm text-caption full-width"
                  color="primary"
                  label="Settings"
                  icon="settings"
                  to="/manageAdmin"
                />
              </div>
              <div class="row justify-center">
                <q-btn
                  push
                  dense
                  class="q-mt-sm text-caption full-width"
                  color="primary"
                  label="Logout"
                  icon="logout"
                  to="/"
                />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
        <!----------------------------------------------------  ----->
        <div class="lt-md">
          <q-btn
            flat
            dense
            round
            @click="toggleLeftDrawer"
            aria-label="Menu"
            icon="menu"
            class="q-mx-md"
          />
        </div>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
  export default {
  
  }
  </script>
  
  <style>
  
  </style>