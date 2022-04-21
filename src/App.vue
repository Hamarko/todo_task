<template>
 <div id="app">
    <todo-main-wrapper/>
 </div>
</template>

<script>
import todoMainWrapper from './components/todo-main-wrapper'

export default {
  name: 'App',
  components: {
    todoMainWrapper
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
