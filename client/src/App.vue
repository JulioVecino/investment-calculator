<template>
  <Suspense>
    <template #default>
      <Coins/>
    </template>
    <template #fallback>
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </template>
  </Suspense>
</template>

<script>
import Coins from './components/Coins.vue'

export default {
  name: 'App',
  components: {
    Coins
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
