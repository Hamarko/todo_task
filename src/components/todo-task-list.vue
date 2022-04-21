<template>
  <div class="todo-task-list">
    <h1>Task list</h1>
    <button 
        class="button-edit"     
        @click="createTask"
      >Add Task</button>    
    <taskItem 
      v-for="task in TASKS"
      :key="task.id"
      :id="task.id"
      :isTaskListItem="true"
    />
  </div>
</template>

<script>
import taskItem from './todo-task-item.vue'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import { v4 as uuidv4 } from "uuid";
export default {
  name: 'todo-task-list',
  components: {
    taskItem
  },
  data() {
    return {}     
  },
  methods:{
    ...mapActions(["GET_TASKS"]),
    ...mapMutations(["CREATE_TASK_IN_STATE"]),
    createTask(){
      const task = {
        id: uuidv4(),
        taskCardArray: [],
        titleTask: ""
      }
      this.CREATE_TASK_IN_STATE(task)
      this.$router.push({
        name: 'task',
        params: {
          id: task.id,
          isNew: true
        }
      })
    }
  },
  computed: {
    ...mapGetters(["TASKS"])
  }
}
</script>

<style lang="scss">

</style>