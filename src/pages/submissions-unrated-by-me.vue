<template>
  <div>
    <list-submissions-table
      pageTitle="Unrated by Me"
      :pageSubtitle="message"
      :data="data"
      :loading="loading"
    ></list-submissions-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ListSubmissionsTable from "components/ListSubmissionsTable";
import submissionsData from "../utils/get-submissions";
export default {
  components: { ListSubmissionsTable },
  data() {
    return {
      showDeleteDialog: false,
      loading: true,
      deleteItemData: {},
      filter: "",
      data: [],
      message: `For the current issue, which is: ${this.$store.state.store.currentIssue.toUpperCase()}`
    };
  },
  methods: {
    ...mapActions("store", ["updateCurrentIssue"])
  },
  created() {
    this.$firestore
      .collection("metadata")
      .doc("currentIssue")
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          this.updateCurrentIssue(doc.data().currentIssue);
          (async () => {
            let data = await submissionsData();
            data.forEach(doc => {
              console.log("item issue: ", doc.issue, "|||| app state current issue:", this.$store.state.store.currentIssue);
              if (doc.issue == this.$store.state.store.currentIssue) {
                if (
                  doc.ratings &&
                  !doc.ratings[this.$store.state.store.user.uid]
                ) {
                  this.data.push(doc);
                }
              }
            });

            this.loading = false;
          })();
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

<style></style>
