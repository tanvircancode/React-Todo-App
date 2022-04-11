import React, { useState } from "react";
import classes from "./styles.module.css";
import ToDoLists from "./ToDoLists";

function App() {
  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState([]);

  const listOfItems = () => {
    setItems((oldItems) => {
      return [...oldItems, inputList];
    });
    setInputList("");
  };

  const deleteItems = (id) => {
    setItems((oldItems) => {
      return oldItems.filter((arrayElem, index) => {
        return index !== id;
      });
    });
  };

  return (
    <div className={classes.main_div}>
      <div className={classes.center_div}>
        <br />
        <h1 className={classes.todo_header}> ToDo list</h1>
        <input
          value={inputList}
          type="text"
          onChange={(e) => setInputList(e.target.value)}
          placeholder="Add a items"
        />

        <button onClick={listOfItems}>+</button>
        <ol>
          {items.map((itemVal, index) => {
            return (
              <ToDoLists
                itemVal={itemVal}
                key={index}
                id={index}
                onSelect={deleteItems}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default App;
