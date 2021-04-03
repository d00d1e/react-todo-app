import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  // input focus
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: uuidv4(),
      text: input,
    });

    setInput("");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            className="todo-input edit"
            placeholder="Update your todo"
            value={input}
            name="text"
            onChange={handleChange}
            ref={inputRef}
          />
          <button type="submit" className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            className="todo-input"
            placeholder="Add a todo"
            value={input}
            name="text"
            onChange={handleChange}
            ref={inputRef}
          />
          <button type="submit" className="todo-button">
            Add Todo
          </button>
        </>
      )}
    </form>
  );
}
