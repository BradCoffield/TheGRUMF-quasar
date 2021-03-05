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
export default {
  components: { ListSubmissionsTable },
  data() {
    return {
      showDeleteDialog: false,
      loading: true,
      deleteItemData: {},
      filter: "",
      search: "",
      editedKey: "",
      deleteItemKey: "",
      dialogDelete: false,
      columns: [
        {
          label: "Author",
          name: "name",
          sortable: true,
          field: "name",
          align: "left",
          classes: "bg-accent ellipsis",
          style: "max-width: 100px",
          headerClasses: "bg-primary text-black"
        },
        {
          name: "genre",
          label: "Genre",
          field: "genre",
          sortable: true,
          align: "left"
        },
        {
          name: "title",
          label: "Title",
          field: "title",
          sortable: true,
          align: "left"
        },

        {
          name: "created",
          label: "Created",
          field: "createdPretty",
          sortable: true,
          align: "left"
        },
        // {
        //   name: "url",
        //   label: "Link",
        //   field: "url",
        //   sortable: true,
        //    align: "left",
        // },
        { name: "actions", label: "Actions", field: "", align: "center" }
      ],
      data: [],
      defaultOpenedDetails: [1],
      isPaginated: false,
      isPaginationSimple: false,
      paginationPosition: "bottom",
      currentPage: 1,
      perPage: 5,
      errors: [],
      ref: this.$firestore.collection("submissions")
    };
  },
  created() {
    // this.isLoading = true;

    this.ref.onSnapshot(querySnapshot => {
      this.data = [];
      querySnapshot.forEach(doc => {
        if (doc.data().decisionObject.decisionStatus == false) {
          console.log("unfinalized:", doc.id);
        }
        if (doc.data().decisionObject.decisionStatus == true) {
          console.log("finalized:", doc.id);
        }
        // console.log(doc.id, doc.data())
        let ddate;
        if (doc.data().updated) {
          ddate = new Date(doc.data().updated.toString());
          // console.log(ddate.toDateString());
        }
        //grabs the individual pieces of our individual records. So they can be table-ified
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
        if (doc.data().decision == "Rejected") {
          this.pieceRejected = true;
        }
        if (doc.data().decision == "Accepted") {
          this.pieceAccepted = true;
        }
      });
      this.loading = false;
    });
  }
};
</script>

<style></style>
