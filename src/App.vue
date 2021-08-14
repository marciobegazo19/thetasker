<template>
  <v-app>
    <head>
    </head>
    <Nav></Nav>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Nav from './components/nav/nav';

export default {
  name: 'App',

  components: {
    Nav,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
  #app{
    background-color: #F1F1F1;
  }
</style>
