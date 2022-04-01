<template>
  <div class='words-panel'>
      <div>
            <button @click="checkState()"> Check state</button>
            <button @click="getConsoleWords()"> getConsoleWords </button>
            <button @click="saveWords(word.id)"> Save words </button>
            <button @click="createWord()"> Create word </button>
      </div>
      <word-mini-card :word="word" v-for="word in words" :key="word.id"/>
  </div>
</template>

<script>
import WordMiniCard from './WordMiniCard.vue'
export default {
  components: { WordMiniCard },
    mounted() {
        this.$store.dispatch('loadWords')
    },
    computed: {
        words() { 
            return this.$store.state.filtered_words
        },
    },
    methods: {
        checkState() {
            console.log(this.$store.getters.getWords)
        },
        getConsoleWords() {
            //this.words = this.$store.getters.getWords
            console.log(this.words)
        },
        saveWords(id) {
            this.$store.dispatch('saveWords', {id})
        },
        createWord() {
            this.$store.dispatch('createWord')
        },
        deleteWord(id) {
            this.$store.words
            this.$store.dispatch('deleteWord', id)
        }
    },
    
}
</script>

<style>
.words-panel {
    background: beige;
}
</style>