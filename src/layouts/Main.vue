<template>
  <q-layout view="lHh Lpr fff" class="bg-primary">
    <q-header elevated class="bg-dark text-grey-1" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mx-md"
        />

        <q-toolbar-title shrink class="row items-center no-wrap text-center">
          <!-- <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg"> -->
          <span class="q-ml-sm brandFont " style="font-size:36px">TheGRUMF</span>
        </q-toolbar-title>

        <q-space />

        <!-- <q-input class="GPL__toolbar-input" dense standout="bg-primary" v-model="search" placeholder="Search">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input> -->

        <!-- <q-btn v-if="$q.screen.gt.xs" flat dense no-wrap color="primary" icon="add" no-caps label="Create" class="q-ml-sm q-px-md">
          <q-menu anchor="top right" self="top right">
            <q-list class="text-grey-8" style="min-width: 100px">
              <q-item aria-hidden="true">
                <q-item-section class="text-uppercase text-grey-7" style="font-size: 0.7rem">Create New</q-item-section>
              </q-item>
              <q-item v-for="menu in createMenu" :key="menu.text" clickable v-close-popup aria-hidden="true">
                <q-item-section avatar>
                  <q-icon :name="menu.icon" />
                </q-item-section>
                <q-item-section>{{ menu.text }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn> -->

        <!-- <q-btn v-if="$q.screen.gt.xs" flat dense no-wrap color="primary" icon="cloud_upload" no-caps label="Upload" class="q-ml-sm q-px-md" /> -->

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <template v-if="!this.$store.state.store.user"
            ><q-btn flat label="Sign In" to="/login"></q-btn
          ></template>
          <template v-if="this.$store.state.store.user">
            <q-btn flat label="Sign Out" @click="signOut"></q-btn>
        
            </template>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      behavior="mobile"
      @click="leftDrawerOpen = false"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-grey-8">
           
            <span class="q-ml-sm">TheGrumf</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
           <q-item v-for="route in siteMap" :key="route.path" :to="route.path">
 {{ route.path }} 
          </q-item> 
          
 
          <!-- <q-item
            v-for="link in links1"
            :key="link.text"
            clickable
            class="GPL__drawer-item"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item
            v-for="link in links2"
            :key="link.text"
            clickable
            class="GPL__drawer-item"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item
            v-for="link in links3"
            :key="link.text"
            clickable
            class="GPL__drawer-item"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item> -->

          <q-separator class="q-my-md" />
<!-- 
          <q-item clickable class="GPL__drawer-item GPL__drawer-item--storage">
            <q-item-section avatar>
              <q-icon name="cloud" />
            </q-item-section>
            <q-item-section top>
              <q-item-label>Storage</q-item-label>
              <q-linear-progress :value="storage" class="q-my-sm" />
              <q-item-label caption>2.6 GB of 15 GB</q-item-label>
            </q-item-section>
          </q-item> -->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view />

      <q-page-sticky v-if="$q.screen.gt.sm" expand position="left">
        <div class="fit q-pt-xl q-px-sm column">
          <q-btn
            round
            flat
            color="accent"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
            to="/active-submissions"
          >
            <q-icon size="22px" name="list" />
            <div class="GPL__side-btn__label">List Active</div>
          </q-btn>

          <q-btn
            round
            flat
            color="accent"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
            to="/add-submission"
          >
            <q-icon size="22px" name="add_circle" />
            <div class="GPL__side-btn__label">Add New</div>
          </q-btn>

          <q-btn
            round
            flat
            color="accent"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
            to="/stock-responses"
          >
            <q-icon size="22px" name="blur_circular" />
            <div class="GPL__side-btn__label">Stock Responses</div>
            <!-- <q-badge floating color="red" text-color="white" style="top: 8px; right: 16px">
              1
            </q-badge> -->
          </q-btn>

          <q-btn
            round
            flat
            color="accent"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
            to="/unfinalized-submissions"
          >
            <q-icon size="22px" name="insert_link" />
            <div class="GPL__side-btn__label">Unfinalized Submissions</div>
          </q-btn>
        </div>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { Screen } from "quasar";
export default {
  name: "GRUMFLayout",

  data() {
    return {
      leftDrawerOpen: false,
      search: "",
      siteMap: this.$router.options.routes[0].children
      // storage: 0.26,
      // links1: [
      //   { icon: "photo", text: "Photos" },
      //   { icon: "photo_album", text: "Albums" },
      //   { icon: "assistant", text: "Assistant" },
      //   { icon: "people", text: "Sharing" },
      //   { icon: "book", text: "Photo books" }
      // ],
      // links2: [
      //   { icon: "archive", text: "Archive" },
      //   { icon: "delete", text: "Trash" }
      // ],
      // links3: [
      //   { icon: "settings", text: "Settings" },
      //   { icon: "help", text: "Help & Feedback" },
      //   { icon: "get_app", text: "App Downloads" }
      // ],
      // createMenu: [
      //   { icon: "photo_album", text: "Album" },
      //   { icon: "people", text: "Shared Album" },
      //   { icon: "movie", text: "Movie" },
      //   { icon: "library_books", text: "Animation" },
      //   { icon: "dashboard", text: "Collage" },
      //   { icon: "book", text: "Photo book" }
      // ]
    };
  },
  methods: {
    signOut() {
      console.log("signOut");
      this.$fireAuth.signOut();
    }
  }
};
</script>

<style lang="sass">
.GPL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 35%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368

    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px

  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500

  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>
