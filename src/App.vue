<template>

  <Home />
  <TheLoader v-if="showLoading" />
</template>

<script>
import Home from './components/Home.vue'
import TheLoader from './components/TheLoader.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed:{
   ...mapState({
     showLoading: (state) => state.showLoading,
   })
  },
  components: {
    Home,
    TheLoader
  }
}
</script>

<style>
*{
  background-color: aliceblue;
  font-family: sans-serif monospace;
}
</style>
