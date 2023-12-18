/* eslint-disable no-undef */
const todoList = require("../todo");
let todos;
todos = todoList();

describe("TodoList Test Suite", () => {
  test("Should add new todo", () => {
    const todoItemsCount = todos.all.length;
    todos.add({
      title: "Test todo 1",
      completed: false,
      dueDate: "2023-12-20",
    });
    expect(todos.all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(todos.all[0].completed).toBe(false);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("checks retrival overdue items", () => {
    const todayDate = new Date();
    const formattedDate = (d) => d.toISOString().split("T")[0];
    const yesterday = formattedDate(
      new Date(todayDate.setDate(todayDate.getDate() - 1)),
    );

    const overDueTodoItemsCount = todos.overdue().length;
    const overdueAdd = {
      title: "Do Coding",
      dueDate: yesterday,
      completed: false,
    };
    todos.add(overdueAdd);
    expect(todos.overdue().length).toEqual(overDueTodoItemsCount + 1);
  });

  test("checks retrival due today items", () => {
    const todayDate = new Date();
    const formattedDate = (d) => d.toISOString().split("T")[0];
    const today = formattedDate(todayDate);

    const DueTodayTodoItemsCount = todos.dueToday().length;
    const todayAdd = {
      title: "Do laundry",
      dueDate: today,
      completed: "false",
    };
    todos.add(todayAdd);
    expect(todos.dueToday().length).toEqual(DueTodayTodoItemsCount + 1);
  });

  test("checks retrival due later items", () => {
    const todayDate = new Date();
    const formattedDate = (d) => d.toISOString().split("T")[0];
    const tomorrow = formattedDate(
      new Date(todayDate.setDate(todayDate.getDate() + 2)),
    );

    const DueLaterTodoItemsCount = todos.dueLater().length;
    const laterAdd = {
      title: "Return a book",
      dueDate: tomorrow,
      completed: false,
    };
    todos.add(laterAdd);
    expect(todos.dueLater().length).toEqual(DueLaterTodoItemsCount + 1);
  });
});
