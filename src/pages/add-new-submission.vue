<template>
  <q-page>
    <!-- <h2 style="">
      
        Add New Submission
        <div class="text-subtitle2 text-italic">
          Always such hope in beginnings.
        </div> 
    </h2> -->
      <q-card  class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card"> <h2 style="">
   
        Add New Submission
        <div class="text-subtitle2 text-italic">
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
export default {
  data() {
    return {
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
        ratings: []
      },
      ref: this.$firestore.collection("submissions")
    };
  },

  methods: {
    getDate() {
      let date = new Date();
      return date.toISOString();
    },
    sendSub(evt) {
      evt.preventDefault();
      this.submission.updated = this.getDate();
      this.submission.created = this.getDate();
      this.ref
        .add(this.submission)
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
