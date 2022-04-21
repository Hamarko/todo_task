<template>
  <div class="todo-task-card">
    <div class="todo-task-car-checkbox" >
      <input 
        type="checkbox" 
        :disabled="isTaskListItem"
        v-model="isChecked"
        >
    </div>
    <div class="todo-task-car-text" v-if="isTaskListItem">      
      <p class="clip">{{textarea}}</p>
    </div>    
    <div class="todo-task-car-text" v-if="!isTaskListItem">      
      <textarea v-model="textarea" ></textarea>
    </div>
    <div class="todo-task-car-button" v-if="!isTaskListItem"> 
      <button 
        class="button-delet"        
        @click="deleteCard"
      >Delet</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card:Object,
    isTaskListItem: Boolean
  },
  methods: {
    deleteCard() {
      this.$emit('deleteCard',this.card.id)
    }
  },
  computed: {
    textarea: {
      get(){
        return this.card.title
      },
      set(newText){
        let card = this.card
        card.title = newText
        console.log(card)
        this.$emit('pachCardInTask',card)
      }
    },
    isChecked: {
      get(){
        return this.card.status
      },
      set(newStatus){
        let card = this.card
        card.status = newStatus
        this.$emit('pachCardInTask',card)
      }
    }
  }
}
</script>

<style lang="scss">
  .todo-task-card {
    display: flex;
    box-shadow:  0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;   
  }  
  .todo-task-car-checkbox{
    flex-direction: column;
    width: 10%;
    align-self: center;

  }
  .todo-task-car-text{
    flex-direction: column;
    width: 70%;
    justify-content: flex-start;
    p{
      text-align: left;
    }
  }
  .todo-task-car-button{
    flex-direction: column;
    width: 20%;
    
  }
  .clip {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>