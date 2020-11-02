<template>
 
     <q-page>
       <div >
         <h2>Please Login<div class="text-subtitle2 text-italic">TheGRUMF doesn't ask much but it does ask that you be authorized.</div></h2>
      <div v-if="!this.$store.state.store.user">
     
      <div id="firebaseui-auth-container"></div>
 
    
      </div>
      <div v-else>
        You are logged in as {{ this.$store.state.store.user.displayName }}
      
      </div>
    </div>
     </q-page>
</template>

<script>
import firebase from "firebase/app";
import "firebaseui/dist/firebaseui.css";
// import firebaseui from 'firebaseui'
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loggedUser: this.$store.state.store.user
    };
  },

  mounted() {
  
  

    const firebaseui = require("firebaseui");
    var ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fireAuth);
    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: "/",
      callbacks: {
        signInSuccessWithAuthResult(authResult) {
          console.log("signInSuccessWithAuthResult");
          console.log(authResult);
           
        },
        uiShown: function() {
          console.log("uiShown");
        }
      }
      // Other config options...
    });
  },
  methods: {
    signOut() {
      console.log("signOut");
      this.$fireAuth.signOut();
    }
  }
};
</script>
