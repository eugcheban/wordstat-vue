<template>
  <div class='background-card'>
      <div class='card'>
          <button @click="setIdChosedCard(word.id)">Close</button><br>
          <forgets-count :word="word"/>
          <button @click="setIdChosedCard(word.id)">Options</button>
          <a >{{word.id}}</a>
          <input type="text" placeholder="Word" v-model="word.en">

          <textarea class='ru' v-model="word.translations"/>
          <textarea class='meet' v-model="word.examples_en"/>
          
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ForgetsCount from './ForgetsCount.vue'
export default {
  components: { ForgetsCount },
    methods: {
        setIdChosedCard(word_id) {
            this.$store.dispatch('setIdChosedCard', { id: word_id, cmd: "close" })
        },
        ...mapGetters([
            'getSelectedWord'
        ])
    },
    computed: {
        word: {
            get() {
                let response = this.$store.getters.getSelectedWord
                console.log(response)
                return response === undefined ? 0 : response
            },
            set(value){
                this.$store.dispatch('updateWord', value)
            }
        }
    }
}
</script>

<style>
.background-card {
    width:100%;
    height:100%;
    background-color:rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0px;
    top: 0px;
}
.card {
    background: black;
    height: 50%;
    width: 50%;
    border: solid 5px;
}
.en {
    width: 90%;
    height: 10%;
    border: 5px dashed rgb(12, 12, 148);
    margin: 10px;
}
.ru {
    width: 90%;
    height: 10%;
    border: 5px dashed rgb(14, 76, 95);
    margin: 10px;
}
.meet {
    width: 90%;
    height: 10%;
    border: 5px dashed rgb(104, 80, 13);
    margin: 10px;
}
</style>