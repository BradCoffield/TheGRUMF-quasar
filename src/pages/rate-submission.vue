<template>
  <q-page>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>
        Rate Submission
        <div class="text-subtitle2">You judgy fuck.</div>
      </h2></q-card
    >

    <q-form @submit="sendSub" @reset="onReset" class=" bg-dark q-pa-xl">
      <div class="text-h4 text-white q-mb-xl">
        Rating for: {{ submission.title }}
      </div>
      <q-badge color="primary" style="font-size:24px;padding:10px">
        {{ ratingSlide }}
      </q-badge>
      <q-slider
        v-model="ratingSlide"
        color="primary"
        :min="0"
        :step="1"
        :max="10"
      />
      <q-input
        label="Rating Notes"
        v-model="ratingNotes"
        type="textarea"
        dark
        standout="bg-teal text-white"
      >
      </q-input>
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
  </q-page>
</template>

<script>
export default {
  name: "submissionDetails",
  data() {
    return {
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
    console.log(this.$store.state.store.user);
    this.ref
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.submission = doc.data();
          console.log(this.submission);
          console.log(this.$route.params.id);
        } else {
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
      evt.preventDefault();
      this.submission.updated = this.getDate();
      this.submission.ratings.push({...this.ratingsDraft});

      this.ref
        .doc(this.$route.params.id)
        .set(this.submission, { merge: true })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
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
