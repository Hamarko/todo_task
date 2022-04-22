import { createStore } from "vuex"
import axios from "axios"
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "http://localhost:3000/tasks"

export const store = createStore({
  state:{
    tasks: [],
    showPopup: false,
    eventPopupObject: {
      eventAction:"",
      eventData:{}
    },
    isNewTask: false
  },
  mutations:{
    SET_TASKS_TO_STATE(state, tasks){
      state.tasks = tasks      
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },
    POPUP_EVENT(state, eventPopupObject){
      state.showPopup = true
      state.eventPopupObject = eventPopupObject
    },
    CLOSED_POPUP(state){
      state.showPopup = false
    },
    DELET_TASK_IN_STATE(state, taskId){
      const taskIdArray = state.tasks.findIndex(task => task.id === taskId)
      state.tasks.pop(taskIdArray)
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },
    CREATE_TASK_IN_STATE(state, task){  
      state.isNewTask = true 
      state.tasks.push(task)
    },
    UPDATE_TASK_IN_STATE(state, task){
      state.tasks.map(taskItem => {
        if(taskItem === task.id ) taskItem = task
      })
      state.isNewTask = false
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },
    DELET_CARD_IN_STATE(state, taskIdArray, cardId){
      const cardIdArray = state.tasks[taskIdArray].taskCardArray.findIndex(card => card.id === cardId)
      state.tasks[taskIdArray].taskCardArray.pop(cardIdArray)
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },
    CREATE_CARD_IN_STATE(state, taskIdArray){
      state.tasks[taskIdArray].taskCardArray.push({
        "id": uuidv4(),
        "title": "",
        "status": false
      })
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
    }
  },
  actions:{
    GET_TASKS({commit}) {
      return axios.get(BASE_URL).then((response) => {
        commit("SET_TASKS_TO_STATE",response.data)
      }).catch((error) => {
        console.error(`Error on GET_TASKS`);
        console.error(error);
      })
    },
    POST_TASK({commit},task) {
      return axios.post(BASE_URL,task).then((response) => { 
        commit("UPDATE_TASK_IN_STATE",response.data)
      }).catch((error) => {
        console.error(`Error on PUT_TASK`);
        console.error(error);
      })
    },
    PUT_TASK({commit},task){
      return axios.put(BASE_URL+"/"+task.id,task).then((response) => {      
        commit("UPDATE_TASK_IN_STATE",response.data)
      }).catch((error) => {
        console.error(`Error on PUT_TASK`);
        console.error(error);
      })
    },
    DELET_TASK({commit},taskId){
      return axios.delete(BASE_URL+"/"+taskId).then((response) => {
        console.log("DELET_TASK respos data ", response.data)
        commit("DELET_TASK_IN_STATE",taskId)
      }).catch((error) => {
        console.error(`Error on DELET_TASK`);
        console.error(error);
      })
    }
  },
  getters:{
    TASKS(state){
      return state.tasks
    },
    SHOW_POPUP(state){
      return state.showPopup
    },
    EVENT_POPUP_OBJECT(state){
      return state.eventPopupObject
    },
    IS_NEW_TASK(state){
      return state.isNewTask
    }
  }
})