<template>
  <div class="popup-wrapper" ref="popup-wrapper">
    <div class='popup'>
      <div class="popup-header">
        <span>{{popupTitle}}</span>        
      </div>
      <div class="popup-content">
        <slot></slot>
      </div>
      <div class="popup-footer">
        <button class="close-modal" @click="closePopup">No</button>
        <button class="submit-btn"  @click="doAction">Yes</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations,mapGetters} from 'vuex'
export default {
  name: "tod-popup",
  props: {
    popupTitle: {
      type: String,
      default: 'Popup name'
    },
    rightBtnTitle: {
      type: String,
      default: 'Ok'
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapMutations(["CLOSED_POPUP"]),
    doAction() {
      const action = this.EVENT_POPUP_OBJECT.eventAction
      const data = this.EVENT_POPUP_OBJECT.eventData
      if (action == "delet"){
        if (data.type == "task") this.DELET_TASK(data.taskId)
        if (data.type == "card") this.DELET_CARD(data.taskId, data.cardId)
      }
      this.CLOSED_POPUP()
    },
    closePopup() {
      console.log("Close")
      this.CLOSED_POPUP()
    }
  },
  computed: {
    ...mapGetters(["EVENT_POPUP_OBJECT"])
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
    padding: 16px;
    position: fixed;
    top: 50px;
    width: 400px;
    background: #ffffff;
    box-shadow: 0 0 17px 0 #e7e7e7;
    z-index: 10;
    &-header, &-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .submit-btn {
      padding: 8px;
      color: #ffffff;
      background: #26ae68;
    }
    .close-modal {
      padding: 8px;
      color: #ffffff;
      background: red;
    }
  }
</style>