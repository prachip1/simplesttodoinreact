import React,{useState, useEffect} from 'react';
import './App.css';
import "./components/style.css"

function App() {

  // for the todo value from input box
const [todovalue, setTodovalue] = useState("");

// this is to keep track of todos// to retrieve todos
const [todos, setTodos] = useState(() =>{

  const addedTodos = localStorage.getItem("todos");

  if(addedTodos){
    return JSON.parse(addedTodos);
  }
  else{
    return [];
  }

});

useEffect(()=>{
//adding into localstorage
  localStorage.setItem("todos", JSON.stringify(todos))

},[todos]);


function stateChange(e){
  setTodovalue(e.target.value);
}

function handleSubmit(e){
  e.preventDefault();

  if( todovalue !== ""){
    setTodos([
      ...todos,{
        id: todos.length + 1,
        todoname:todovalue.trim()
      }
    ]);
  }
  setTodovalue("");
}


function handleDelete(id){
  const deleteTodo = todos.filter((todovalue)=>{
    return todovalue.id !== id;
  });

  //filter out all the todovalue from the todo list whose id doesnt match with the id sent while clicking the delete button
  // and then add the new array after taking all the value to the todo list

  setTodos(deleteTodo);
}
  return (
    <div className="App">
     <h4>Todo list</h4>
      <form>
       <input
          name="todo"
          type='text'
          value ={todovalue}
          onChange={stateChange} />
          
          <button onClick={handleSubmit}>Add</button>
      </form>
       <div>
        {todos.map((todo) => (
          <p key ={todo.id}>{todo.todoname}<button onClick={()=>handleDelete(todo.id)}>delete</button></p>
        )
        
        )}
       </div>
     
    </div>
  );
}

export default App;
