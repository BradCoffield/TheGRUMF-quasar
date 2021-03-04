<template>
  <q-page>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>
        Rate Submission
        <div class="text-subtitle2">You judgy f*ck.</div>
      </h2></q-card
    >

    <q-form @submit="sendSub" @reset="onReset" class=" bg-dark q-pa-xl">
      <div class="text-h4 text-white q-mb-xl">
        Rating for: {{ submission.title }} by {{ submission.author }}
      </div>
      <q-badge color="primary" style="font-size:24px;padding:10px">
        {{ ratingsDraft.ratingNumber }}
      </q-badge>
      <q-slider
        v-model="ratingsDraft.ratingNumber"
        color="primary"
        :min="0"
        :step="1"
        :max="10"
        dark
      />
      <q-input
        label="Rating Notes"
        v-model="ratingsDraft.ratingNotes"
        type="textarea"
        dark
        standout="bg-teal text-white"
      >
      </q-input>
      <div>
        <q-btn label="Submit" type="submit" color="secondary" />
        <!-- <q-btn
          label="Reset"
          type="reset"
          color="secondary"
          flat
          class="q-ml-sm"
        /> -->
      </div>
    </q-form>
    <success-dialog
      :show="successDialogShow"
      @clearForm="this.onReset"
      @closeDialog="this.successDialogShow = false"
    ></success-dialog>
    <error-dialog
      :show="errorDialogShow"
      @closeDialog="this.errorDialogShow = false"
    ></error-dialog>
    <q-dialog v-model="existingRatingAlertShow" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="done_outline" color="dark" text-color="white" />
          <span class="q-ml-sm"
            >Please note: You have an already existing rating. You may edit it
            here.</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Active Subs"
            color="secondary"
            v-close-popup
            to="/active-submissions"
          />
          <q-btn flat label="Close" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import SuccessDialog from "components/SuccessDialog.vue";
import ErrorDialog from "components/ErrorDialog.vue";
export default {
  name: "submissionDetails",
  components: { SuccessDialog, ErrorDialog },
  data() {
    return {
      existingRatingAlertShow: false,
      successDialogShow: false,
      errorDialogShow: false,
      key: this.$route.params.id,
      ratingSlide: 0,
      ratingNotes: "",
      ratingsDraft: {
        raterID: this.$store.state.store.user.uid,
        raterName: this.$store.state.store.user.displayName,
        raterEmail: this.$store.state.store.user.email,
        ratingNumber: this.ratingSlide,
        ratingNotes: this.ratingNotes
      },
      submission: {
        author: "",
        email: "",
        file: "",
        updated: "",
        notes: "",
        title: "",
        author_letter: "",
        genre: "",
        primary_genre: "",
        ratings: []
      },
      ref: this.$firestore.collection("submissions")
    };
  },
  created() {
    console.log("params id:", this.$route.params.id);
    console.log("store user:", this.$store.state.store.user);
    let loggedUserUID = this.$store.state.store.user.uid;
    this.ref
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.ratingsDraft.ratingNumber = 0;
          //populate the submission details
          this.submission = doc.data();
          // if the logged in user already has a rating for this item
          if (this.submission.ratings && this.submission.ratings[loggedUserUID])
            this.existingRatingAlertShow = true;
          this.ratingsDraft.ratingNumber = this.submission.ratings[
            loggedUserUID
          ].ratingNumber;
          this.ratingsDraft.ratingNotes = this.submission.ratings[
            loggedUserUID
          ].ratingNotes;
        } else {
          this.ratingsDraft.ratingNumber = 0;
          alert("No such document!");
        }
      });
  },

  methods: {
    getDate() {
      let date = new Date();
      return date.toISOString();
    },
    sendSub(evt) {
      let here = this;
      evt.preventDefault();
      this.submission.updated = this.getDate();
      // this.submission.ratings.push({...this.ratingsDraft});
      let update = {};
      update[`ratings.${this.ratingsDraft.raterID}`] = this.ratingsDraft;
      this.ref
        .doc(this.$route.params.id)
        .update(update)
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
      this.submission.author = null;
      this.submission.email = null;
      this.submission.file = null;
      this.submission.updated = null;
      this.submission.notes = null;
      this.submission.title = null;
      this.submission.author_letter = null;
      this.submission.genre = null;
      this.submission.primary_genre = null;
      this.ratingSlide = 0;
      this.ratingNotes = null;
    }
  }
};
</script>

<style scoped>
.q-input {
  margin: 2rem 0;
}
.q-textarea {
  margin: 2rem 0;
}
</style>
