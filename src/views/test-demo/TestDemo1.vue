<template>
  <div>
    <a-input
      v-model:value="inputValue"
      placeholder="请输入你需要加入的任务"
      @pressEnter="addTodo"
      class="todo-input"
    />
    <a-card>
      <div v-for="(item, index) in todoList" class="todo-item">
        <a-checkbox v-model:checked="item.finished">
          {{ item.title }}
        </a-checkbox>
        <a-button danger block style="width: 80px" @click="deleteTodo(index)">删除</a-button>
      </div>
      <p>
        <a-checkbox v-model:checked="checkedAll" @change="changeCheck"></a-checkbox>
        已完成{{ finishedItem }}/全部{{ todoList.length }}
      </p>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import '../../types/global.d.ts'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const inputValue = ref('')
const checkedAll = ref(false)
const localTodo = useLocalStorage('todo-key', [])
const todoList = reactive<TodoItem[]>(localTodo.value.value)
const finishedItem = computed(() =>
  todoList.length > 0 ? todoList.filter((item) => item.finished).length : 0,
)

const addTodo = () => {
  const text = inputValue.value
  if (text.trim()) {
    const todoitem: TodoItem = {
      finished: false,
      title: text,
    }
    todoList.unshift(todoitem)
    inputValue.value = ''
  }
}
const deleteTodo = (index: number) => {
  todoList.splice(index, 1)
}

const changeCheck = (e: Event) => {
  todoList.forEach((item) => (item.finished = checkedAll.value))
}
watch(
  () => todoList,
  () => {
    localTodo.setValue(todoList)
    const hasNoCheck = todoList.some((item) => !item.finished)
    checkedAll.value = !hasNoCheck
  },
  { deep: true },
)
</script>
<style scoped>
.todo-input {
  margin-bottom: 24px;
}
.todo-item {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
