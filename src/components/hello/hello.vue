<template>
  <div>
    <v-btn class="nn" @click="yy" color="success">text</v-btn>
  </div>
</template>

<script>
export default {
    data: ()=>({
        msg: 'hello webpack!'
    }),
    methods: {
      yy(){
        console.log('asd')
      }
    }
}
</script>

<style>

</style>