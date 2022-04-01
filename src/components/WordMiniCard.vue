<template>
  <div class='word-cell'>
      <div> 
          <button class='close-button' @click="deleteWord(word.id)"> X </button>
      </div>
    <div @click="setIdChosedCard({id: word.id, cmd: 'set'})">
        <div> 
            <a>{{word.en}}</a><br/>
            <a>{{word.translations}}</a>
        </div>  
    </div>
      
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    props: [
        'word'
    ],
    methods: {
        ...mapActions([
            'deleteWord',
            'setIdChosedCard'
        ]),
        ...mapGetters([
            'getSearchRequest'
        ])
    },
    computed: {
        checkIfSearch() {
            let search_request = this.$store.getters.getSearchRequest
            console.log(`search_requst : ${search_request}`)
            if(search_request !== '') {
                return this.word.en.startsWith(search_request) ? true : false
            }
            
            return true
        }
    }
}
</script>

<style>
.close-button {
    
}
.word-cell {
    height: 100px;
    width: 100px;
    background: aquamarine;
    display: inline-block;
    border: dashed 2px black;
    border-radius: 5%;
    margin: 10px;
}
</style>