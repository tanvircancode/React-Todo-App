import React from "react";
import classes from "./styles.module.css";



export default function ToDoLists({ itemVal, index, id, onSelect }) {
  return (
    <>
      <div className={classes.lists}>
        <i
          className="fa fa-times"
          aria-hidden="true"
          onClick={() => {
            onSelect(id);
          }}
        />
        <li>{itemVal}</li>
      </div>
    </>
  );
}
