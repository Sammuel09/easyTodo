<template>
  <div id="app">
    <Todo />
  </div>
</template>

<script>
import "tailwindcss/tailwind.css";
import Todo from "./components/Todo.vue";

export default {
  name: "App",
  components: {
    Todo,
  },
};
</script>

<style>
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
}
body {
  height: 100vh;
}
</style>
