<template>
  <q-page>
    <h2 style="">
      Edit Submission
    </h2>
    <p>I'm sure you have your reasons.</p>

    <q-card>
      <q-form @submit="sendSub" @reset="onReset" class=" bg-dark q-pa-xl">
        <q-input
          v-model="submission.author"
          label="Author"
          required
          dark
          standout="bg-teal text-white"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        ></q-input>
        <q-input
          v-model="submission.email"
          label="Author Email"
          required
          dark
          standout="bg-teal text-white"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        ></q-input>
        <q-input
          v-model="submission.title"
          label="Submission Title"
          required
          dark
          standout="bg-teal text-white"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        ></q-input>
        <q-input
          v-model="submission.genre"
          label="Genre"
          required
          dark
          standout="bg-teal text-white"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        ></q-input>
        <q-input
          v-model="submission.primary_genre"
          label="Author's Primary Genre"
          required
          dark
          standout="bg-teal text-white"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        ></q-input>

        <q-input
          v-model="submission.file"
          label="File Location"
          required
          dark
          standout="bg-teal text-white"
        ></q-input>

        <!-- <v-select :items="items" label="Which Issue?" v-model="submission.issue" :item-value="submission.issue" required> </v-select> -->

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
  </q-page>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";

export default {
  name: "editSubmission",
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
        ratings: {}
      },
      ref: this.$firestore.collection("submissions")
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection(`issue_${this.$route.query.issue}`)
      .doc(this.$route.params.id);

    let theSubmission = ref.get().then(doc => {
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
    sendSub(evt) {
      evt.preventDefault();
      this.submission.updated = this.getDate();
      this.ref
        .add(this.submission)
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  }
};
</script>

<style></style>
