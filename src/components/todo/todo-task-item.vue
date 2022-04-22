<template>
  <div class="todo-task-item">
    <div class="todo-task-hader">
      <h2 v-if="isTaskListItem">{{titleTask}}</h2>
      <input 
        type="text"
        placeholder="Enter titel task"
        v-if="!isTaskListItem"
        v-model="titleTask"
      >    
      <button 
        class="button-green"  
        v-if="!isTaskListItem"      
        @click="createCard"
      >Add card</button>
    </div>
    <hr>
    <taskCard
      v-for="card in taskCards"
      :key="card.id"
      :card="card"
      :idTaskArray="taskIdArray"
      :isTaskListItem="isTaskListItem"
      v-on:pachCardInTask="pachCardInTask"
      v-on:deleteCard="deleteCard"
    />
    <hr>
    <div class="todo-task-item-footer">
      <button         
        class="button-blu"
        v-if="isTaskListItem"
        @click="editTask"   
      >Edit</button>
      <button         
        class="button-blu"
        v-if="!isTaskListItem"
        @click="back"   
      >Back</button>
      <button 
        class="button-green"
        v-if="!isTaskListItem&&!IS_NEW_TASK"
        @click="updateTask"   
      >Update</button>
      <button 
        class="button-green"
        v-if="!isTaskListItem&&IS_NEW_TASK"
        @click="createTask"   
      >Create</button>
      <button 
        class="button-red"        
        @click="deletTask"
      >Delet</button>
      <button         
        class="button-blu"
        v-if="!isTaskListItem"
        @click="GET_TASKS"   
      >Cancel</button>
    </div>
  </div>
</template>
<script>
import taskCard from './todo-task-card.vue'
import {mapMutations,mapGetters, mapActions} from 'vuex'

export default {
  name: 'todo-task-item',
  components: {
    taskCard
  },
  props: {
    id: String,
    isTaskListItem: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    ...mapMutations(["SET_TASKS_TO_STATE","POPUP_EVENT","CREATE_CARD_IN_STATE","DELET_CARD_IN_STATE","UPDATE_CARD_IN_STATE"]),
    ...mapActions(["PUT_TASK", "GET_TASKS", "POST_TASK"]),
    
    //Task action
    editTask() {
      this.$router.push({
        name: 'task',
        params: {
          id: this.id
        }
      })
    },
    updateTask() {
      this.PUT_TASK(this.TASKS[this.taskIdArray])
      this.$router.push({name: 'mainPage'})
    },    
    deletTask() {
      const eventPopupObject = {
        eventAction:"delet",
        eventData:{type:"task", taskId:this.id}
      }
      this.POPUP_EVENT(eventPopupObject)
    },
    createTask(){
      this.POST_TASK(this.TASKS[this.taskIdArray])
      this.$router.push({name: 'mainPage'})
    },
    back(){
      const eventPopupObject = {
        eventAction:"back",
        eventData:{}
      }
      this.POPUP_EVENT(eventPopupObject)     
    },

    //Card action
    pachCardInTask(card){ 
      const tasks = this.TASKS
      tasks[this.taskIdArray].taskCardArray.map( cardItem => {
        if(cardItem.id === card.id) cardItem = card
      })
      this.SET_TASKS_TO_STATE(tasks)
    },
    createCard() {
      this.CREATE_CARD_IN_STATE(this.taskIdArray)
    },
    deleteCard(cardId) {
      this.DELET_CARD_IN_STATE(this.taskIdArray, cardId)
    }
  },
  computed: {
    ...mapGetters(["TASKS", "IS_NEW_TASK"]),
    taskIdArray(){
      return this.TASKS.findIndex( task => task.id === this.id )
    },
    taskCards(){
      let taskCards = []
      if (this.isTaskListItem && this.TASKS[this.taskIdArray].taskCardArray.length > 2){
        taskCards = this.TASKS[this.taskIdArray].taskCardArray.slice(0, 2)
      }else{
        taskCards = this.TASKS[this.taskIdArray].taskCardArray
      }
      return taskCards
    },
    titleTask: {
      get(){
        return this.TASKS[this.taskIdArray].titleTask
      },
      set(newText){
        const tasks = this.TASKS
        tasks[this.taskIdArray].titleTask = newText
        this.SET_TASKS_TO_STATE(tasks)
      }
    }
  }
}
</script>

<style lang="scss">
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