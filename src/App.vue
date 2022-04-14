<template>
  <div id="app">
    <HelloWorld/>
    <SearchBar/>
    <word-full-card v-show="chosedCard"/>
    <words-panel/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SearchBar from './components/SearchBar.vue'
import WordFullCard from './components/WordFullCard.vue'
import WordsPanel from './components/WordsPanel.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    HelloWorld,
    SearchBar,
    WordsPanel,
    WordFullCard
  },
  methods: {
    ...mapGetters([
      'getChosedCard'
    ])
  },
  computed: {
    chosedCard() {
      return this.$store.getters.getChosedCard !== 0 ? true : false
    }
  },
  mounted() {
    this.$store.dispatch('loadWords')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
