/* eslint-disable no-undef */
const todoList = require("../todo");
 let todos;
todos = todoList();

describe('TodoList Test Suite', () => {
  test('Should add new todo', () => {
    const todoItemsCount = todos.all.length;
    todos.add({
      title: 'Test todo 1',
      completed: false,
      dueDate: new Date().toISOString().slice(0,10),
    });
    todos.add({
        title: 'Test todo 2',
        completed: true,
        dueDate: new Date().toISOString().slice(0,10),
      });
    expect(todos.all.length).toBe(todoItemsCount + 2);
  });

  test('Should mark a todo as complete', () => {
    expect(todos.all[0].completed).toBe(false);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test('checks retrival of overdue items', () => {
    const todayDate = new Date();
    const formattedDate = (d) => d.toISOString().split('T')[0];
    const today = formattedDate(todayDate);
    const yesterday = formattedDate(new Date(todayDate.setDate(todayDate.getDate() - 1)));
    const tomorrow = formattedDate(new Date(todayDate.setDate(todayDate.getDate() + 2)));

    const overDueTodoItemsCount =todos.overdue().length;
    const overdueAdd = {title: 'Do Cooking', dueDate: yesterday,completed:false};
    todos.add(overdueAdd);
    expect(todos.overdue().length).toEqual(overDueTodoItemsCount+1); 
  });

  test('checks retrival of due today items', () => {
    const todayDate = new Date();
    const formattedDate = (d) => d.toISOString().split('T')[0];
    const today = formattedDate(todayDate);
    const yesterday = formattedDate(new Date(todayDate.setDate(todayDate.getDate() - 1)));
    const tomorrow = formattedDate(new Date(todayDate.setDate(todayDate.getDate() + 2)));

    const DueTodayTodoItemsCount =todos.dueToday().length;
    const todayAdd={title: 'Do assignment ',dueDate: today,completed:'false'};
    todos.add(todayAdd);
    expect(todos.dueToday().length).toEqual(DueTodayTodoItemsCount+1); 
  });

  test('checks retrival of due later items', () => {
    const todayDate = new Date();
    const formattedDate = (d) => d.toISOString().split('T')[0];
    const today = formattedDate(todayDate);
    const yesterday = formattedDate(new Date(todayDate.setDate(todayDate.getDate() - 1)));
    const tomorrow = formattedDate(new Date(todayDate.setDate(todayDate.getDate() + 2)));

    const DueLaterTodoItemsCount =todos.dueLater().length;
    const laterAdd={title:'Do installation linux',dueDate:tomorrow,completed:false};
    todos.add(laterAdd);
    expect(todos.dueLater().length).toEqual(DueLaterTodoItemsCount+1); 
  });
});