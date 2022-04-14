import { createStore } from 'vuex'
import wordsModule from './modules/words/words'

const store = createStore({
  modules: {
    words: wordsModule
  }
})

export default store;