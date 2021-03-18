<template>
  <q-page>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2 class="">
        Set Current Issue
        <div class="text-subtitle2  "></div></h2
    ></q-card>
    <!-- <br /><br />  -->
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary  ">
      <p class="text-body-1">
        This page allows you to set what issue is the "current" issue. This
        affects pages that care about the current issue such as submissions that
        are unjudged for the current issue.
      </p>
      <p class="text-body-1">
        Changing this setting affects any other users of the Grumf. But they can
        always change it back if they want to be assholes.
      </p>
      Issue now set as current: {{ currentIssue }}

      <q-card class=" q-mt-xl">
        <q-form @submit="sendIssueUpdate" class=" bg-dark q-pa-xl">
          <q-input
            v-model="currentIssueTemp"
            label="Change Current Issue To:"
            required
            dark
            standout="bg-teal text-white"
          ></q-input>
          <div>
            <q-btn
              label="Submit"
              type="submit"
              color="secondary"
              class="q-mt-lg"
            /></div></q-form></q-card
    ></q-card>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      currentIssueTemp: "",
      // currentIssueFormatted: currentIssue.toUpperCase()
      ref: this.$firestore.collection("metadata").doc("currentIssue")
    };
  },
  computed: {
    currentIssue() {
      return this.$store.state.store.currentIssue;
    }
  },
  created() {
    // console.log(this.$store.state.store.currentIssue);
    this.ref.get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          this.updateCurrentIssue(doc.data().currentIssue)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
  },
  methods: {
    ...mapActions("store", ["updateCurrentIssue"]),

    // getDate() {
    //   let date = new Date();
    //   return date.toISOString();
    // },
    sendIssueUpdate(evt) {
      let here = this;
      evt.preventDefault();
      let val = here.currentIssueTemp;
      this.ref
        .update({ currentIssue: val })
        .then(function() {
          console.log("Document successfully updated!");
          here.$router.push("/");
          // here.successDialogShow = true;
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
          // here.errorDialogShow = true;
        });
    }
  }
};
</script>

<style></style>
