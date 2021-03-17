<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      ref: this.$firestore.collection("metadata").doc("currentIssue"),
      currentIssueFromFirestore: ""
    };
  },
  methods: {
    ...mapActions("store", ["handleAuthStateChanged", "updateCurrentIssue"])
  },
  mounted() {
    this.handleAuthStateChanged();
  },
  created() {
    this.ref
      .get()
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
  }
};
</script>
