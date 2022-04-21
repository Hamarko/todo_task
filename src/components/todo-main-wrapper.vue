<template>
  <div class="todo-main-wrapper">
    <popup v-if="SHOW_POPUP"/>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import popup from './popup/popup.vue'
export default {
  name: 'todo-main-wrapper',  
  components:{
    popup
  },
  data() {
    return {
      title: "Main wrapper"
    }
  },
  methods: {
    ...mapActions(["GET_TASKS"]),
    ...mapMutations(["SET_TASKS_TO_STATE"])
  },
  computed: {
    ...mapGetters(["SHOW_POPUP"])
  },
  mounted(){
    if (localStorage.tasks){
      console.log(localStorage)
      const tasks = JSON.parse(localStorage.tasks)
      this.SET_TASKS_TO_STATE(tasks)
    } else{
      this.GET_TASKS()
    }
  }
}
</script>

<style lang="scss">
  .todo-main-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 900px;
    margin: 0 auto;
  }
  .button-edit{
    @extend %button;
    background-color: #259cc4;
  }
  .button-delet{
    @extend %button;
    background-color: #f44336;;
  }

</style>