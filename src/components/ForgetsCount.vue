<template>
  <div>
      <a style="color:yellow">{{word.forgets_count}}</a>
      <button> + </button>
      <button> - </button>
  </div>
</template>

<script>
export default {
    props: ['word']
}
</script>

<style>

</style>