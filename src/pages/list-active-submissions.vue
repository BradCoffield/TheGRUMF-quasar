<template>
  <q-page>
    <div>
      <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
        <h2 class="">
          Active Submissions
          <div class="text-subtitle2  ">
            Deal with 'em.
          </div>
        </h2></q-card
      >
      <!-- <br /><br />  -->
      <q-card>
        <q-table
          row-key="key"
          :columns="columns"
          :data="data"
          color="primary"
          :filter="filter"
          dark
          >` @`
          <template v-slot:top>
            <q-space />
            <q-input
              outlined
              bg-color="secondary"
              debounce="300"
              color="grey"
              v-model="filter"
              label="Search"
            >
              <template v-slot:append>
                <q-icon name="search" color="grey" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                dense
                round
                flat
                color="grey"
                @click="viewItem(props)"
                icon="preview"
                ><q-tooltip content-style="font-size: 16px"
                  >View Details</q-tooltip
                ></q-btn
              >
              <q-btn
                dense
                round
                flat
                color="grey"
                @click="editItem(props)"
                icon="edit"
                ><q-tooltip content-style="font-size: 16px"
                  >Edit</q-tooltip
                ></q-btn
              >
              <q-btn
                dense
                round
                flat
                color="grey"
                @click="reviewItem(props)"
                icon="rate_review"
                ><q-tooltip content-style="font-size: 16px"
                  >Rate Submission</q-tooltip
                ></q-btn
              >
              <q-btn
                dense
                round
                flat
                color="grey"
                @click="deleteItem(props)"
                icon="delete"
                ><q-tooltip content-style="font-size: 16px"
                  >Delete</q-tooltip
                ></q-btn
              >
            </q-td>
          </template>
        </q-table>
      </q-card>
    </div>
    <delete-dialog
      :show="showDeleteDialog"
      :item="deleteItemData"
    ></delete-dialog>
  </q-page>
</template>

<script>
import submissionsData from "../utils/get-submissions";
import DeleteDialog from "components/DeleteDialog.vue";
export default {
  components: { DeleteDialog },
  data() {
    return {
      showDeleteDialog: false,
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
      // ref: this.$firestore.collection("issue_Three")
      ref: this.$firestore.collection("submissions")
    };
  },
  created() {
    (async () => {
      let data = await submissionsData();
      this.data = data;
    })();
  },
  methods: {
    editItem(item) {
      console.log(item.key);
      //   let itemIndex = this.data.indexOf(item);
      //   console.log(this.data[itemIndex].key);
      this.$router.push({
        name: "edit-submission",
        params: { id: item.key }
      });
    },
    viewItem(item) {
      console.log(item);
      this.$router.push({
        name: "submission-details",
        params: { id: item.key }
      });
    },
    reviewItem(item) {
      console.log(item);
      this.$router.push({
        name: "rate-submission",
        params: { id: item.key }
      });
    },
    deleteItem(item) {
      console.log(item);
      this.deleteItemData = item;
      this.showDeleteDialog = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    //deleteItemConfirm = We are hitting okay in dialog to actually delete item. So this is where we actually delete it.
    deleteItemConfirm() {
      this.ref
        .doc(this.deleteItemKey)
        .delete()
        .then(function() {
          // console.log("uid", firebase.auth().user.uid);
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          // console.log("uid", firebase.auth().user.uid);
          console.log(firebase.auth().currentUser.email);
          console.error("Error removing document: ", error);
        });

      this.closeDelete();
    },
    deleteCheatsheet(id) {
      this.ref
        .doc(id)
        .delete()
        .then(function() {
          // console.log("uid", firebase.auth().user.uid);
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          // console.log("uid", firebase.auth().user.uid);
          console.log(firebase.auth().currentUser.email);
          console.error("Error removing document: ", error);
        });
    }
  }
};
</script>

<style scoped>
.q-table td {
  font-size: 18px !important;
}
</style>
