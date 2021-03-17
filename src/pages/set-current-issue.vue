<template>
  <div>
    <p>
      This page allows you to set what issue is the "current" issue. This
      affects pages that care about the current issue such as submissions that
      are unjudged for the current issue.
    </p>
    <p>
      Changing this setting affects any other users of the Grumf. But they can
      always change it back if they want to be assholes.
    </p>
    Issue now set as current: {{ currentIssue }}

    <q-card class=" q-mt-xl">
      <q-form @submit="sendSub" @reset="onReset" class=" bg-dark q-pa-xl">
        <q-input
          v-model="currentIssue"
          label="Current Issue"
          required
          dark
          standout="bg-teal text-white"
        ></q-input></q-form
    ></q-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      currentIssue: this.$store.state.store.currentIssue
    };
  },
  computed: {
    //   pageTitle() {
    //   return this.$store.state.pageTitle;
    // }
  },
  created() {
    console.log(this.$store.state.store.currentIssue);
  },
  methods: {
    ...mapActions("store", ["updateCurrentIssue"]),
    methods: {
      getDate() {
        let date = new Date();
        return date.toISOString();
      },
      sendSub(evt) {
        let here = this;
        evt.preventDefault();
        this.submission.updated = this.getDate();
        this.submission.created = this.getDate();
        this.ref
          .add(this.submission)
          .then(function() {
            console.log("Document successfully written!");
            here.successDialogShow = true;
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
            here.errorDialogShow = true;
          });
      },

      onReset() {
        this.submission.author = "";
        this.submission.email = "";
        this.submission.file = "";
        this.submission.updated = "";
        this.submission.notes = "";
        this.submission.title = "";
        this.submission.author_letter = "";
        this.submission.genre = "";
        this.submission.primary_genre = "";
        this.submission.issue = "";
      }
    }
  },
  mounted() {}
};
</script>

<style></style>
