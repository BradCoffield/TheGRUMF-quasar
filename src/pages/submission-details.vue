<template>
  <q-page>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2 style="">
        Submission Details
      </h2></q-card
    >

    <q-card class="my-card text-white bg-dark q-pa-xl">
      <q-card-section>
        <div class="text-h4">{{ submission.title }}</div>
        <div class="text-subtitle1">
          by {{ submission.author }} :
          <a :href="`mailto:${submission.email}`">{{ submission.email }}</a>
        </div>
      </q-card-section>
      <hr />
      <q-card-section class="q-pt-none text-body1">
        <ul>
          <li>
            <span class="text-weight-bold">Genre:</span> {{ submission.genre }}
          </li>
          <li>
            <span class="text-weight-bold">Author's Primary Genre:</span>
            {{ submission.primary_genre }}
          </li>
          <li>
            <span class="text-weight-bold">Author's Letter/Bio:</span>
            {{ submission.author_letter }}
          </li>
          <li>
            <span class="text-weight-bold">Notes:</span>
            {{ submission.notes }}
          </li>

          <li>
            <span class="text-weight-bold">Link to the piece: </span>
            <a :href="submission.file" target="_blank">{{ submission.file }}</a>
          </li>
        </ul>

        <q-btn
          color="accent"
          text-color="white"
          label="RATE THIS SUBMISSION"
          class="full-width q-mt-xl"
          @click="reviewItem"
        />
      </q-card-section>
    </q-card>
    <q-card class="my-card text-white bg-dark q-pa-xl">
      <h5 class="q-mb-xs">Existing Ratings</h5>
      <hr class="q-mb-lg" />
      <template v-if="emptyRatings"
        >No one has rated this submission yet.</template
      >
      <template v-if="emptyRatings == false">
        <ul>
          <li
            v-for="item in submission.ratings"
            v-bind:key="item.name"
            style="display:inline"
             
          >
            <q-card class=" my-card text-white bg-dark q-pa-sm q-ma-sm" >
                <q-card-section>
        <div class="text-h6">{{ item.raterName }}</div>
         
      </q-card-section>
       <q-card-section>
     Rating: {{ item.ratingNumber }} <br />
              <p>Rating Notes: {{ item.ratingNotes }}</p>
      </q-card-section>
              
            
            </q-card>
          </li>
        </ul>
      </template>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "submissionDetails",
  data() {
    return {
      key: this.$route.params.id,
      emptyRatings: true,
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
          console.log("ratings:", this.submission.ratings)
          if (doc.data().ratings.length == 0) {
            this.emptyRatings = true;
          }
          else this.emptyRatings = false
          // console.log("submission data:", this.submission);
          // console.log(this.$route.params.id);
        } else {
          alert("No such document!");
        }
      });
  },

  methods: {
    reviewItem() {
      this.$router.push({
        name: "rate-submission",
        params: { id: this.key }
      });
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
