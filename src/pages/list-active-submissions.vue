<template>
  <q-page  >
    <div>
      <h2 style="font-size:48px;font-weight:bold;border-bottom:2px dotted">Active Submissions</h2>
      <!-- <br /><br />  -->
      <q-card>
        <q-table
          row-key="key"
          :columns="columns"
          :data="data"
          color="primary"
          :filter="filter"
          dark
           
        >`  @`
          <template v-slot:top>
            <q-space />
            <q-input outlined bg-color="secondary" debounce="300" color="grey" v-model="filter" label="Search">
              <template v-slot:append>
                <q-icon name="search" color="grey"/>
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
                @click="editItem(props)"
                icon="edit"
              ><q-tooltip content-style="font-size: 16px">Edit</q-tooltip></q-btn>
              <q-btn
                dense
                round
                flat
                color="grey"
                @click="viewItem(props)"
                icon="preview"
              ><q-tooltip content-style="font-size: 16px">View Details</q-tooltip></q-btn>
              <q-btn
                dense
                round
                flat
                color="grey"
                @click="reviewItem(props)"
                icon="rate_review"
              ><q-tooltip content-style="font-size: 16px">Review Submission</q-tooltip></q-btn>
              <q-btn
                dense
                round
                flat
                color="grey"
                @click="deleteItem(props)"
                icon="delete"
              ><q-tooltip content-style="font-size: 16px">Delete</q-tooltip></q-btn>
            </q-td>
          </template>
  
       
        </q-table>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
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
            classes: 'bg-accent ellipsis',
          style: 'max-width: 100px',
          headerClasses: 'bg-primary text-black'
        },    {
          name: "genre",
          label: "Genre",
          field: "genre",
          sortable: true,
           align: "left",
        },
        {
          name: "title",
          label: "Title",
          field: "title",
          sortable: true,
           align: "left",
        },
    
        // {
        //   name: "updated",
        //   label: "Updated",
        //   field: "updatedPretty",
        //   sortable: true,
        //    align: "left",
        // },
        { name: "actions", label: "Actions", field: "", align: "center" }
        // { label: 'Actions', field: 'actions', sortable: false },
        //   { text: 'Calories', value: 'calories' },
        //   { text: 'Fat (g)', value: 'fat' },
        //   { text: 'Carbs (g)', value: 'carbs' },
        //   { text: 'Protein (g)', value: 'protein' },
        //   { text: 'Iron (%)', value: 'iron' },
      ],
      data: [],
      defaultOpenedDetails: [1],
      isPaginated: false,
      isPaginationSimple: false,
      paginationPosition: "bottom",
      currentPage: 1,
      perPage: 5,
      errors: [],
      ref: this.$firestore.collection("issue_Three") //name of the collection in firestore that contains all your real data
    };
  },
  created() {
    this.isLoading = true;

    this.ref.onSnapshot(querySnapshot => {
      this.data = [];
      querySnapshot.forEach(doc => {
        console.log(doc.id, doc.data())
        let ddate;
        if (doc.data().updated) {
          ddate = new Date(doc.data().updated.toString());
          console.log(ddate.toDateString());
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
              author_letter: doc.data().author_letter,
              genre: doc.data().genre,
              primary_genre: doc.data().primary_genre,
              ratings: doc.data().ratings,
              Michael: doc.data().Michael,
              Ashley: doc.data().Ashley,
              Brad: doc.data().Brad,
              finalDecision: doc.data().decision,
              decisionNotification: doc.data().actuallyNotified,
              decisionNotes: doc.data().decisionNotes,
        });
         if (doc.data().decision == "Rejected") {
              this.pieceRejected = true;
            }
            if (doc.data().decision == "Accepted") {
              this.pieceAccepted = true;
            }
      });
      this.isLoading = false;
    });
  },
  methods: {
    editItem(item) {
      console.log(item);
      //   let itemIndex = this.data.indexOf(item);
      //   console.log(this.data[itemIndex].key);
      //   this.$router.push({
      //     name: "edit-cheatsheet",
      //     params: { id: this.data[itemIndex].key }
      //   });
    },
    viewItem(item) {
      console.log(item);
      //   let itemIndex = this.data.indexOf(item);
      //   console.log(this.data[itemIndex].key);
      //   this.$router.push({
      //     name: "edit-cheatsheet",
      //     params: { id: this.data[itemIndex].key }
      //   });
    },
    reviewItem(item) {
      console.log(item);
      //   let itemIndex = this.data.indexOf(item);
      //   console.log(this.data[itemIndex].key);
      //   this.$router.push({
      //     name: "edit-cheatsheet",
      //     params: { id: this.data[itemIndex].key }
      //   });
    },
    deleteItem(item) {
      console.log(item);
      //   let itemIndex = this.data.indexOf(item);
      //   let itemKey = this.data[itemIndex].key;
      //   this.deleteItemKey = itemKey;
      //   this.dialogDelete = true;
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
.text-right{text-align: left!important;}
</style>
