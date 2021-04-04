import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const LOCAL_STORAGE_KEY = "todoApp.todos";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  //retrieve from localStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  //store to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  //add todo
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };

  //edit todo
  const editTodo = (id, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) => prev.map((item) => (item.id === id ? newValue : item)));
  };

  //complete todo
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  //delete todo
  const deleteTodo = (id) => {
    const removedTodo = [...todos].filter((todo) => todo.id !== id);
    setTodos(removedTodo);
  };

  return (
    <div className="todo-container">
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        editTodo={editTodo}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}
