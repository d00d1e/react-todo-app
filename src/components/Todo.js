import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

export default function Todo({ todos, editTodo, completeTodo, deleteTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitEdit = (value) => {
    editTodo(edit.id, value);
    setEdit({
      id: null,
      value: "hello",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitEdit} />;
  }

  return todos.map((todo) => (
    <div
      key={todo.id}
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
    >
      <div onClick={() => completeTodo(todo.id)}>{todo.text}</div>
      <div className="icons">
        <TiEdit
          className="edit-icon"
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
        />
        <RiCloseCircleLine
          className="delete-icon"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
    </div>
  ));
}
