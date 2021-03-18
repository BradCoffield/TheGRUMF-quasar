import { firebaseAuth, firebaseDb } from "boot/firebase";
import { store } from "quasar/wrappers";

export const state = () => ({
  user: false,
  currentIssue:"",
  genre_options: [
    {
      label: "Fiction",
      value: "Fiction"
    },
    {
      label: "Poetry",
      value: "Poetry"
    },
    {
      label: "Creative Nonfiction",
      value: "Creative Nonfiction"
    },
    {
      label: "Visual",
      value: "Visual"
    },
    {
      label: "Other",
      value: "Other"
    }
  ],
});

export const mutations = {

  SET_CURRENT_ISSUE(state, issue){
    state.currentIssue = issue
  },
 
  SET_USER(state, payload) {
    let authUser = payload;
    state.user = {
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            picture: authUser.photoURL
          };
  },

  RESET_USER(state) {
    state.user = null;
  }
 
};

export const getters = {
  userDetails(state){return state.user},
  user(state) {
    return state.user;
  }
};

export const actions = {
  handleAuthStateChanged({commit}) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log(firebaseAuth.currentUser.displayName);
        console.log(firebaseAuth.currentUser.email);
        console.log(firebaseAuth.currentUser.uid);
        console.log(firebaseAuth.currentUser.photoURL);
        console.log(user.displayName); //i should probably use this that is passed to the function
       commit('SET_USER', user)
      } else {
        console.log("no user now");
         commit('RESET_USER', false);
        // store.dispatch('updateAuthState', {authUser: false})
        // User is signed out.
      }
    });
  },
  updateCurrentIssue({commit}, issue){
    console.log("in store, updatecurrentissue and payload = ", issue);
    commit('SET_CURRENT_ISSUE', issue)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
