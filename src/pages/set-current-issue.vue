<template>
  <div>
      <p>This page allows you to set what issue is the "current" issue. This affects pages that care about the current issue such as submissions that are unjudged for the current issue.</p>
      <p>Changing this setting affects any other users of the Grumf. But they can always change it back if they want to be assholes.</p>
      Issue now set as current: {{currentIssue}}

  </div>
</template>

<script>
import { mapActions } from "vuex";
import * as submissionsData from "../utils/get-submissions"
export default {
    data(){
        return{
            currentIssue: ""
        }
    },
  computed:{
    //   pageTitle() {
    //   return this.$store.state.pageTitle;
    // }
  },
  created(){
    console.log(this.$store.state.store.currentIssue)
  },
   methods: {
     ...mapActions('store', ['updateCurrentIssue'])
   },
   mounted(){
     this.updateCurrentIssue("three")
   }
};
</script>

<style>

</style>