<template>
  <div class="popup-wrapper" ref="popup-wrapper">
    <div class='popup'>      
      <div class="popup-content">
        <p>{{popupTitle}}</p>
      </div>
      <div class="popup-footer">
        <button class="button-red" @click="closePopup">No</button>
        <button class="button-green"  @click="doAction">Yes</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from 'vuex'
export default {
  name: "todo-popup",  
  methods: {
    ...mapMutations(["CLOSED_POPUP"]),
    ...mapActions(["DELET_TASK","GET_TASKS"]),
    doAction() {
      const action = this.EVENT_POPUP_OBJECT.eventAction
      const data = this.EVENT_POPUP_OBJECT.eventData
      if (action == "delet"){
        if (data.type == "task") this.DELET_TASK(data.taskId)
      } 
      if (action == "back"){
        this.GET_TASKS()
        this.$router.push({name: 'mainPage'})
      }
      this.CLOSED_POPUP()
    },
    closePopup() {
      this.CLOSED_POPUP()
    }
  },
  computed: {
    ...mapGetters(["EVENT_POPUP_OBJECT"]),
    popupTitle(){
      if (this.EVENT_POPUP_OBJECT.eventAction == "delet"){
        return "Are you sure you want to delete this task?"
      }
      if (this.EVENT_POPUP_OBJECT.eventAction == "back"){
        return "Are you sure you want to baeck?"
      }
      return ""
    }

  },
  mounted() {
    
  },
}
</script>

<style lang="scss">
  .popup-wrapper {
    background: rgba(64,64,64, .4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .popup {
    padding: 30px;
    position: fixed;
    top: 150px;
    width: 400px;
    background: #ffffff;
    box-shadow: 0 0 17px 0 #e7e7e7;
    &-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-content {
      display: flex;
      justify-content: center;
      align-items: center;
    }    
  }
</style>