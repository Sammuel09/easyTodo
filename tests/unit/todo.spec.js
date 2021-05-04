import { shallowMount } from "@vue/test-utils";
import Todo from "@/components/Todo.vue";

const mockDeleteTodoItem = jest.fn();
const mockCompleteTodoItem = jest.fn();
const mockCreateTodoItem = jest.fn();

const wrapper = shallowMount(Todo, {
  data() {
    return {
      todos: [
        {
          id: 0,
          text: "write a book",
          isCompleted: false,
        },
        {
          id: 1,
          text: "sing a song",
          isCompleted: false,
        },
        {
          id: 2,
          text: "play some music",
          isCompleted: false,
        },
      ],
    };
  },
  methods: {
    deleteTodoItem: mockDeleteTodoItem,
    completeTodoItem: mockCompleteTodoItem,
    createTodoItem: mockCreateTodoItem,
  },
});

describe("HelloWorld.vue", () => {
  it("is a Vue Instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  it("creates a todo ", async () => {
    const createTodo = wrapper.find("#create-todo");
    expect(createTodo.text()).toBe("Create To-Do");
    await createTodo.trigger("click");
    expect(mockCreateTodoItem).toBeCalled();
  });
  it("deletes a todo ", async () => {
    const deleteTodo = wrapper.find("#delete-todo img");
    expect(deleteTodo.exists()).toBe(true);
    await deleteTodo.trigger("click");
    expect(mockDeleteTodoItem).toBeCalled();
  });
  it("completes a todo ", async () => {
    const completeTodo = wrapper.find("#complete-todo img");
    expect(completeTodo.exists()).toBe(true);
    await completeTodo.trigger("click");
    expect(mockCompleteTodoItem).toBeCalled();
  });
});
