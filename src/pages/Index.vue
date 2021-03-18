<template>
  <q-page class="flex flex-center">
  <h2 ><span class="brandFont">TheGRUMF</span> </h2>
  
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      
    };
  },
  created: function() {
    console.log("ehhhh!");
    // // this.$router.options.routes[0].forEach(element => {
    // //   console.log(element);
    // // });
    // console.log(this.$router.options.routes[0])
     console.log(this.$router.options.routes[0].children);
  },
  
};
</script>
