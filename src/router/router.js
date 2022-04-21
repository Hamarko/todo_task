import {createRouter, createWebHashHistory} from "vue-router"
import todoTaskList from '@/components/todo-task-list'
import taskItem from '@/components/todo-task-item.vue'


const routes = [
  { 
    path: '/',
    name: 'mainPage',
    component: todoTaskList 
  },
  { 
    path: '/task/:id',
    name: 'task',
    component: taskItem,
    props: true
  },

]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})