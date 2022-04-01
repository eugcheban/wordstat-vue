import { createStore } from 'vuex'
import Api from '@/service/api.js'

const store = createStore({
  state () {
    return {
      words: [],
      chosed_card: 0,
      words_search: '',
      filtered_words:[]
    }
  },
  getters: {
    getWords(state) {
      console.log('GetWords getter ' + state.words)
      return state.words
    },
    getChosedCard(state) {
      return state.chosed_card
    }, 
    getSelectedWord(state) {
      return state.words.find(word => word.id === state.chosed_card)
    },
    getSearchRequest(state) {
      return state.request
    }
  },
  mutations: {
    SET_ID_CHOSED_CARD(state, params) {
      console.log(params.cmd)
      console.log(state.words.find(word => word.id === params.id))
      switch(params.cmd) {
        case 'close': {
          state.chosed_card = 0
          break;
        }
        case 'set': {
          state.chosed_card = params.id
          break;
        }
        default: state.chosed_card = 0
      }
    },
    LOAD_WORDS(state, data) {
      console.log('Data successfully loaded!')
      console.log(data)
      state.words = data
      state.filtered_words = data
    },
    SAVE_WORDS() {
      console.log(`Data sended to the server!` )
    },
    DELETE_WORD(state, id) {
      this.state.words = this.state.words.filter(word => word.id != id)
      this.state.filtered_words = this.state.words
      console.log(`The word with id: ${id} had been deleted!`)
    },
    CREATE_WORD(state, random_id) {
      console.log(`Word had been created!`)
      let shablon_word_state = {
          "en": "example en",
          "ru": "example ru",
          "id": "0"
      }
      shablon_word_state.id = random_id
      this.state.words.push(shablon_word_state)
    },
    UPDATE_WORD(state, value) {
      console.log("The word had been updated!")
      state.words[state.chosed_card] = value
    },
    SET_SEARCH_REQUEST(state, request) {
      if(request.length > 0) {
        state.filtered_words = state.words.filter((word) => {
          return word.en.toLowerCase().startsWith(request.toLowerCase())
        })
      } else {
        state.filtered_words = state.words
      }
      console.log(state.filtered_words)
      state.words_search = request
    }
  },
  actions: {
    async setIdChosedCard({commit}, params) {
      // send word to json server before reset the chose_card
      console.log("logID " + " " + params.id)
      if(params.cmd === 'close' ){
        await Api().patch(`http://localhost:3000/words/${params.id}`, this.state.words.find(word => word.id === params.id))
      }
      commit('SET_ID_CHOSED_CARD', {id: params.id, cmd: params.cmd})
    },
    async loadWords({commit}) {
      let response = await Api().get('/words')
      // if state doesn't empty, load to server, else load from server
      if(this.state.words == null){
          await Api().patch('/words/1', {
            data: this.state.words
          }).then(response => {
            console.log(`The data has been loaded to server! ${response}`)
          }).catch(error => {
            console.log(`Error occured while load to server data ! ${error}`)
          })
      } else 
        commit('LOAD_WORDS', response.data)
    },
    async saveWords({commit, id, word}) {
      await Api().patch(`/words/${id}`, {
        data: word
      })
      commit('SAVE_WORDS')
    },
    async deleteWord({commit}, id) {
      console.log(id)
      await Api().delete(`http://localhost:3000/words/${id}`)
      commit('DELETE_WORD', id)
    },
    async createWord({commit}) {
      let random_id = Math.ceil(Math.random()*1000000);
      // adding word firstly to the server
      await Api().post(`/words`, {
        en: "example en",
        ru: "example ru",
        id: random_id
      })
      .then(() => {
        // then to the store
        
      })

      commit('CREATE_WORD', random_id)
    },
    updateWord({commit}, value){
      commit('UPDATE_WORD', value)
    },
    setSearchRequest({commit}, request) {
      commit('SET_SEARCH_REQUEST', request)
    }
  },
  mounted(){
    debugger
  }
})


export default store;