import React, { useState , useEffect } from "react";
import todo from "../images/todo.png";
import classes from "../styles.module.css";

const Todo = () => {
  const getLocalItmes = () => {
    let list = localStorage.getItem("lists");
    return list ? JSON.parse(list) : [];
  };


  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState(getLocalItmes());
  const [edit, setEdit] = useState(false);
  const [isEditItem, setIsEditItem] = useState(null);

  // add data to localStorage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items))
 }, [items]);

  const listOfItems = () => {
    if(!inputList){
      alert('Add a Item Please');
    }else if(edit && inputList){
      setItems(
       items.map((elem) => {
        if(elem.id === isEditItem){
             return{...elem, name:inputList};
        }
        return elem;
       })
      );
      setInputList('');
     setEdit(false);
     setIsEditItem(null);
    }else{
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputList,
      };
  
      setItems([...items, allInputData]);
      setInputList("");
    }
    
  };



  const deleteItems = (index) => {
    
    setItems((oldItems) => {
      return oldItems.filter((elem) => {
        return index !== elem.id;
      });
    });
    setInputList("");
    setEdit(false);
  };

  const editItem = (index) => {
    const newEditItem = items.find((elem) => {
       return elem.id === index;
    });
    
    setInputList(newEditItem.name);
    setEdit(true);
    setIsEditItem(newEditItem.id)
   
  };

  const removeAll = () => {
    setItems([]);
    setInputList("");
    setEdit(false);
  };

  

  return (
    <>
      <div className={classes.main_div}>
        <div className={classes.child_div}>
          <figure>
            <img src={todo} alt="Todo" />
            <figcaption>Add your list here</figcaption>
            <hre></hre>
          </figure>

          <div className={classes.inputItem}>
            <input
              type="text"
              value={inputList}
              onChange={(e) => setInputList(e.target.value)}
              placeholder="Add a items"
            />
            {edit ? (
              <span className={classes.new}>
                <i
                  className="fa fa-edit add-btn"
                  onClick={listOfItems}
                  title="Edit Item"
                ></i>
              </span>
            ) : (
              <span className={classes.new}>
                <i
                  className="fa fa-plus add-btn"
                  onClick={listOfItems}
                  title="Add Item"
                ></i>
              </span>
            )}
          </div>

          {items.map((elem) => {
            return (
              <div className={classes.showItems}>
                <div className={classes.eachItem} key={elem.id}>
                  <p>{elem.name}</p>
                  <span className={classes.editItem}>
                    <i
                      className="far fa-edit"
                      title="Edit Item"
                      onClick={() => {
                        editItem(elem.id);
                      }}
                    ></i>
                  </span>
                  <span className={classes.removeItem}>
                    <i
                      className="fas fa-solid fa-trash"
                      title="Delete Item"
                      onClick={() => {
                        deleteItems(elem.id);
                      }}
                    ></i>
                  </span>
                </div>
              </div>
            );
          })}

          {/* clear button */}
          <div className="">
            <button className={classes.removeDiv} onClick={removeAll}>
              <span>Remove All</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
