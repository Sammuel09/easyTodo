<template>
  <div class="flex flex-col items-center bg-gray-100 w-screen h-screen">
    <div class="mt-16">
      <img src="@/assets/easytodo.svg" alt="EasyTodo Logo" />
    </div>
    <div class="grid grid-cols-3 mt-16 w-4/5 sm:w-4/12">
      <div class="col-span-2">
        <input
          class="bg-white p-3 placeholder-gray-easy-100 text-xs rounded-l-lg focus:outline-none w-full"
          type="text"
          name="todo"
          id="todo"
          placeholder="Enter something to-do..."
          v-model="newTodoText"
          v-on:input="removeErrorMsg"
        />
      </div>
      <div
        id="create-todo"
        class="bg-green-main rounded-r-lg p-1 cursor-pointer text-white text-center flex justify-center items-center text-xs md:p-1 lg:text-base"
        @click="createTodoItem"
      >
        Create To-Do
      </div>
      <transition name="fade">
        <div
          v-if="showErrorMsg"
          class="text-sm md:text-base text-red-600 col-span-2 mt-1"
        >
          Please enter a todo text 😎
        </div>
      </transition>
    </div>
    <div class="w-4/5 sm:w-4/12">
      <div class="mt-4 mb-4 text-gray-easy-300">All To-Do's</div>
      <ul class="grid gap-4">
        <li
          v-for="todo in todoItems"
          class="grid grid-cols-5 rounded-r-lg border-0"
          :key="todo.id"
        >
          <div
            id="todo-text"
            class="flex col-start-1 col-span-4 bg-white p-2 pl-3 rounded-l-lg font-normal truncate overflow-hidden"
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
              class="ml-1 mr-4 w-2.5"
            />
            <span v-if="isMobile">
              {{ todo.text | truncate(18) }}
            </span>
            <span v-else>
              {{ todo.text | truncate(35) }}
            </span>
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
                class="w-1/3 md:w-1/4"
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
                class="w-1/3 md:w-1/4"
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
      showErrorMsg: false,
      isMobile: false,
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
        this.showErrorMsg = false;
        return;
      } else {
        this.showErrorMsg = true;
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

    removeErrorMsg() {
      this.showErrorMsg = false;
    },

    /**
     * the onRezise function uses the windown.matchMedia method to
     * check to changes in the view port.
     * This toggles the state to determine how to truncate the text overflow
     * in mobile screens.
     */

    onResize() {
      this.isMobile = window.matchMedia("screen and (max-width: 40em)").matches;
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
    truncate(text, len) {
      const requiredString = text.split("").slice(0, len).join("");
      if (requiredString.length < len) {
        return requiredString;
      }
      return requiredString + "...";
    },
  },
  /**
   * on the mounted lifecycle hook, fire the onResize function on initial page
   * load. Thereafter, an eventlistener is called to listen for the resize
   * event on the window object. Whenever the view port changes, the onResize
   * is called.
   */
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
};
</script>

<style scoped>
/* these classes are added with raw css to style the vue transistion component */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
