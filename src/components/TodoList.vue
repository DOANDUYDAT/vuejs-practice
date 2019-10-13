<template>
  <div>
    <BaseInputText v-model="newTodoText" placeholder="New todo" @keydown.enter="addTodo" />
    <BaseButtonSubmit @onSubmit="onSubmit" :name-button="nameButton" />
    <ul v-if="todos.length">
      <TodoListItem v-for="todo in todos" :key="todo.id" :todo="todo" @remove="removeTodo" />
    </ul>
    <p v-else>Nothing left in the list. Add a new todo in the input above.</p>
  </div>
</template>

<script>
import BaseInputText from "./BaseInputText";
import BaseButtonSubmit from "./BaseButtonSubmit";

import TodoListItem from "./TodoListItem";

let nextTodoId = 1;

export default {
  components: {
    BaseInputText,
    TodoListItem, 
    BaseButtonSubmit
  },
  data() {
    return {
      newTodoText: "",
      nameButton: 'ADD',
      todos: [
        {
          id: nextTodoId++,
          text: "Learn Vue",
        },
        {
          id: nextTodoId++,
          text: "Learn about single-file components",
        },
        {
          id: nextTodoId++,
          text: "Fall in love",
        }
      ]
    };
  },
  methods: {
    addTodo() {
      const trimmedText = this.newTodoText.trim();
      if (trimmedText) {
        this.todos.push({
          id: nextTodoId++,
          text: trimmedText
        });
        this.newTodoText = "";
      }
    },
    removeTodo(idToRemove) {
      this.todos = this.todos.filter(todo => {
        return todo.id !== idToRemove;
      });
    },
    onSubmit: function() {
      this.addTodo()
    }
  }
};
</script>