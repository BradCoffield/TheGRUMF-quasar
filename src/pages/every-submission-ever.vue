<template>
  <div>
    <list-submissions-table
      pageTitle="Every Submission Ever"
      pageSubtitle="The Archives."
      :data="data"
      :loading="loading"
    ></list-submissions-table>
  </div>
</template>

<script>
import ListSubmissionsTable from "components/ListSubmissionsTable";
export default {
  components: { ListSubmissionsTable },
  data() {
    return {
      showDeleteDialog: false,
      loading: true,
      deleteItemData: {},
      filter: "",
      data: [],
      ref: this.$firestore.collection("submissions")
    };
  },
  created() {
    this.ref.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        let ddate;
        if (doc.data().updated) {
          ddate = new Date(doc.data().updated.toString());
        }
        this.data.push({
          key: doc.id,
          name: doc.data().author,
          url: doc.data().file,
          title: doc.data().title,
          email: doc.data().email,
          notes: doc.data().notes,
          issue: doc.data().issue,
          updated: doc.data().updated,
          created: doc.data().created,
          updatedPretty: doc.data().updated ? ddate.toDateString() : " ",
          createdPretty: doc.data().created ? ddate.toDateString() : " ",
          author_letter: doc.data().author_letter,
          genre: doc.data().genre,
          primary_genre: doc.data().primary_genre,
          ratings: doc.data().ratings,
          decisionObject: doc.data().decisionObject
        });
      });
      this.loading = false;
    });
  }
};
</script>

<style></style>
