<template>
  <div>
      <input v-model="setSearchRequest" placeholder="Search..."/>
  </div>
</template>

<script>
export default {
  computed: {
    setSearchRequest: {
      get() {
        return this.$store.getters.getSearchRequest
      },
      set(request) {
        this.$store.dispatch('setSearchRequest', request)
        console.log(`search_requst : ${request}`)
      }
    }
  }
}
</script>

<style>

</style>