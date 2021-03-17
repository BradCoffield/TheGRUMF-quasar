<template>
  <q-page>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2 style="">
        Add New Submission
        <div class="text-subtitle2  ">
          Always such hope in beginnings.
        </div>
      </h2></q-card
    >

    <q-card class=" q-mt-xl">
      <q-form @submit="sendSub" @reset="onReset" class=" bg-dark q-pa-xl">
        <q-input
          v-model="submission.author"
          label="Author"
          required
          dark
          standout="bg-teal text-white"
          
        ></q-input>
        <q-input
          v-model="submission.email"
          label="Author Email"
          required
          dark
          standout="bg-teal text-white"
        ></q-input>
        <q-input
          v-model="submission.title"
          label="Submission Title"
          required
          dark
          standout="bg-teal text-white"
        ></q-input>

        <div class="     text-white">
          <span style="font-size:18px">Submission's Genre</span>
          <q-option-group
            v-model="submission.genre"
            :options="genre_options"
            color="teal"
            inline
            dark
          />
        </div>

        <div class="q-mt-xl q-mb-xl text-white">
          <span style="font-size:18px">Author's Primary Genre</span>
          <q-option-group
            v-model="submission.primary_genre"
            :options="genre_options"
            color="teal"
            inline
            dark
          />
        </div>

        <q-input
          v-model="submission.file"
          label="File Location"
          required
          dark
          standout="bg-teal text-white"
        ></q-input>

        <q-input
          label="Author Letter"
          v-model="submission.author_letter"
          type="textarea"
          dark
          standout="bg-teal text-white"
        >
        </q-input>
        <q-input
          label="Notes for consideration"
          v-model="submission.notes"
          type="textarea"
          dark
          standout="bg-teal text-white"
        >
        </q-input>
        <q-input
          v-model="submission.issue"
          label="Issue"
          required
          dark
          standout="bg-teal text-white"
        ></q-input>

        <div>
          <q-btn label="Submit" type="submit" color="secondary" />
          <q-btn
            label="Reset"
            type="reset"
            color="secondary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card>
    <success-dialog
      :show="successDialogShow"
      :showClearForm="true"
      @clearForm="this.onReset"
      @closeDialog="this.successDialogShow = false"
    ></success-dialog>
    <error-dialog
      :show="errorDialogShow"
      @closeDialog="this.errorDialogShow = false"
    ></error-dialog>
  </q-page>
</template>
<script>
import SuccessDialog from "components/SuccessDialog.vue";
import ErrorDialog from "components/ErrorDialog.vue";
export default {
  name: "AddSubmission",
  components: { SuccessDialog, ErrorDialog },
  data() {
    return {
      successDialogShow: false,
      errorDialogShow: false,

      submission: {
        author: "",
        email: "",
        file: "",
        updated: "",
        created: "",
        notes: "",
        title: "",
        author_letter: "",
        genre: "",
        primary_genre: "",
        ratings: [],
        issue: this.$store.state.store.currentIssue,
        decisionObject: {
          decisionStatus: false, //false if final decision unmade, which when adding ofc it isn't.
          finalDecision: "",
          decisionNotification: "",
          decisionNotes: ""
        }
      },
      ref: this.$firestore.collection("submissions")
    };
  },
  computed: {
    genre_options() {
      return this.$store.state.store.genre_options;
    }
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
      this.submission.issue = this.$store.state.store.currentIssue;
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
