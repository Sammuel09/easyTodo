<template>
  <div class="flex flex-col items-center bg-gray-100 w-screen h-screen">
    <div class="mt-16">
      <img src="@/assets/easytodo.svg" alt="EasyTodo Logo" />
    </div>
    <div class="grid grid-cols-3 mt-16 w-4/5 md:w-4/12">
      <div class="col-span-2">
        <input
          class="bg-white p-3 placeholder-gray-easy-100 text-xs rounded-l-lg focus:outline-none w-full"
          type="text"
          name="todo"
          id="todo"
          placeholder="Enter something to-do..."
          v-model="newTodoText"
        />
      </div>
      <div
        id="create-todo"
        class="bg-green-main rounded-r-lg p-0.5 md:p-2 cursor-pointer text-white text-center flex justify-center items-center text-sm md:text-base"
        @click="createTodoItem"
      >
        Create To-Do
      </div>
    </div>
    <div class="w-4/5 md:w-4/12">
      <div class="mt-4 mb-4 text-gray-easy-300">All To-Do's</div>
      <ul class="grid gap-4">
        <li
          v-for="todo in todoItems"
          class="grid grid-cols-5 rounded-r-lg rounded-l-lg border-0"
          :key="todo.id"
        >
          <div
            id="todo-text"
            class="flex col-start-1 col-span-4 bg-white p-2 pl-3 rounded-l-lg font-normal"
            :class="[
              todo.isCompleted
                ? 'bg-green-light text-white'
                : 'text-gray-easy-300',
            ]"
          >
            <img
              v-if="todo.isCompleted"
              src="@/assets/check.svg"
              alt="Check Icon"
              class="ml-1 mr-4"
            />
            {{ todo.text | truncate }}
          </div>
          <div class="col-span-1 flex flex-row">
            <div
              id="complete-todo"
              class="w-1/2 bg-green-light flex justify-center align-center cursor-pointer"
              @click="completeTodoItem(todo.id)"
            >
              <img
                v-if="!todo.isCompleted"
                src="@/assets/check.svg"
                alt="Check Icon"
                class="w-1/2 md:w-1/3"
              />
            </div>
            <div
              id="delete-todo"
              class="w-1/2 bg-red-easy-100 flex justify-center align-center rounded-r-lg cursor-pointer"
              @click="deleteTodoItem(todo.id)"
            >
              <img
                src="@/assets/delete.svg"
                alt="Delete Icon"
                class="w-1/2 md:w-1/3"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      newTodoText: "",
      todos: [],
      todoId: 0,
    };
  },
  methods: {
    createTodoItem() {
      if (this.newTodoText.length > 0) {
        this.todos = [
          ...this.todos,
          {
            id: this.todoId++,
            text: this.newTodoText,
            isCompleted: false,
          },
        ];
        this.newTodoText = "";
        return;
      }
    },
    deleteTodoItem(id) {
      const todoIndex = this.todoItems.findIndex((todo) => todo.id === id);
      this.todoItems.splice(todoIndex, 1);
    },
    completeTodoItem(id) {
      const completedTodo = this.todoItems.find((todo) => todo.id === id);
      completedTodo.isCompleted = true;
    },
  },
  computed: {
    /**
     * a computed value is used to render the todos to avoid mutating the
     * original array when performing other operations e.g deleteTodo.
     */
    todoItems() {
      return this.todos;
    },
  },
  filters: {
    truncate(text) {
      if (text.length <= 40) {
        return text;
      }
      return text.slice(0, 40) + "...";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
