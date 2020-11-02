<template>
  <q-page  >
    <div>
     <q-card  class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card" >
      <h2>Active Submissions   <div class="text-subtitle2 text-italic">
          Deal with 'em.
        </div></h2></q-card>
      <!-- <br /><br />  -->
      <q-card     >
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
                @click="viewItem(props)"
                icon="preview"
              ><q-tooltip content-style="font-size: 16px">View Details</q-tooltip></q-btn>
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
                @click="reviewItem(props)"
                icon="rate_review"
              ><q-tooltip content-style="font-size: 16px">Rate Submission</q-tooltip></q-btn>
              <!-- <q-btn
                dense
                round
                flat
                color="grey"
                @click="deleteItem(props)"
                icon="delete"
              ><q-tooltip content-style="font-size: 16px">Delete</q-tooltip></q-btn> -->
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
    
        {
          name: "created",
          label: "Created",
          field: "createdPretty",
          sortable: true,
           align: "left",
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
              updated: doc.data().updated,
              created: doc.data().created,
              updatedPretty: doc.data().updated ? ddate.toDateString() : " ",
              createdPretty: doc.data().created ? ddate.toDateString() : " ",
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
 
.q-table td {
  font-size: 18px!important;}
</style>
