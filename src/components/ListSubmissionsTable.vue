<template>
  <q-page>
    <div>
      <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
        <h2 class="">
          {{ pageTitle }}
          <div class="text-subtitle2  ">
            {{ pageSubtitle }}
          </div>
        </h2></q-card
      >

      <q-card>
        <q-table
          row-key="key"
          :columns="columns"
          :data="data"
          color="primary"
          :filter="filter"
          :loading="loading"
          :pagination="initialPagination"
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
import DeleteDialog from "components/DeleteDialog.vue";
export default {
  components: { DeleteDialog },
  props: {
    pageTitle: String,
    data: Array,
    pageSubtitle: String,
    loading: Boolean
  },
  data() {
    return {
      showDeleteDialog: false,
      deleteItemData: {},
      filter: "",

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
        {
          name: "issue",
          label: "Issue",
          field: "issue",
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
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15
      },
      // ref: this.$firestore.collection("issue_Three")
      ref: this.$firestore.collection("submissions")
    };
  },
  methods: {
    editItem(item) {
      console.log(item.key);
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
    }
  }
};
</script>

<style scoped>
.q-table td {
  font-size: 18px !important;
}
</style>
