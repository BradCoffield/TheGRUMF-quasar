<template>
  <q-page>
     <q-card  class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card"> <h2 style="">
      Submission Details
    </h2></q-card>

 <q-card
      class="my-card text-white bg-dark q-pa-xl"
    >
      <q-card-section>
        <div class="text-h4">{{submission.title}}</div>
        <div class="text-subtitle1">by {{submission.author}} : <a :href="`mailto:${submission.email}`">{{submission.email}}</a></div>
      </q-card-section>
<hr>
      <q-card-section class="q-pt-none text-body1">
          <ul>
              <li><span class="text-weight-bold" >Genre:</span> {{submission.genre}} </li>
              <li><span class="text-weight-bold">Author's Primary Genre:</span> {{submission.primary_genre}}</li>
              <li><span class="text-weight-bold">Author's Letter/Bio:</span> {{submission.author_letter}}</li>
              <li><span class="text-weight-bold">Link to the piece: </span> <a :href="submission.file" target="_blank">{{submission.file}}</a></li>
       
          </ul>
       i think still in this card a v-for series of sub-cards of Staff Ratings
              </q-card-section>
 
    </q-card>

 
  </q-page>
</template>

<script>
export default {
  name: "submissionDetails",
  data() {
    return {
      key: this.$route.params.id,
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
