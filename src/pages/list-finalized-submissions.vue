<template>
  <div>
    <list-submissions-table
      pageTitle="Finalized Submissions"
      pageSubtitle="Thank you, submissions."
      :data="data"
      :loading="loading"
    ></list-submissions-table>
  </div>
</template>

<script>
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
      data: []
      // ref: this.$firestore.collection("submissions")
    };
  },
  created() {
    (async () => {
      let data = await submissionsData();
      data.forEach(doc => {
        if (doc.decisionObject.decisionStatus == true) {
          this.data.push(doc);
        }
      });

      this.loading = false;
    })();
  }
};
</script>

<style></style>
