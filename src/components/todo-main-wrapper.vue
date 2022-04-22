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
  mounted() {
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
  .todo-main-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 900px;
    margin: 0 auto;
  }
  .button-blu {
    @extend %button;
    background-color: #259cc4;
  }
  .button-red {
    @extend %button;
    background-color: #f44336;;
  }
  .button-green {
    @extend %button;
    background-color: #26ae68;
  }
    .todo-task-item {
    width: 800px;
    box-shadow:  0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
  }
  .todo-task-item-footer{
    display: flex;
    justify-content: space-around;
  }  
  .todo-task-hader{
    display: flex;
    flex-flow: column;
    input{
      width: 100%;
      padding: 5px 0;
      text-align: center;      
    }
  }
  hr{
    margin-left: $padding*-2;
    margin-right: $margin*-2;
  }

</style>