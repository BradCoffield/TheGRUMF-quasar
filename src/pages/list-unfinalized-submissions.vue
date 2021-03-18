<template>
  <div>
    <list-submissions-table
      pageTitle="Unfinalized Submissions"
      pageSubtitle="They linger here. Waiting..."
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
    };
  },
  created() {
    (async () => {
      let data = await submissionsData();
      data.forEach(doc => {
        if (doc.decisionObject.decisionStatus == false) {
          this.data.push(doc);
        }
      });

      this.loading = false;
    })();
  }
};
</script>

<style></style>
