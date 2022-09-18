import {useState,useEffect} from "react";
import {BsCheckAll,BsPlusCircleFill,BsPencilSquare} from "react-icons/bs"
import ListItem from "./ListItem";

const getData = () => {
    const data = localStorage.getItem("todos");
    if (data){
        return JSON.parse(data)
    }else return [];
}

function App() {
    const [error,setError] = useState("");
    const [todo,setTodo] = useState("");
    const [todos,setTodos] = useState(getData());
    const [toggleSubmit,setToggleSubmit] = useState(false);
    const [editId,setEditId] = useState(null);

    useEffect(() => {
        localStorage.setItem("todos",JSON.stringify(todos));
    },[todos])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (todo.length < 2){
            setError("Please insert your work !!")
        }
        else if(todo.length > 2 && toggleSubmit){
            setTodos(todos.map(item => {
                if (item.id === editId){
                    return {...item,title : todo}
                }
                return item;
            }))
            setToggleSubmit(false);
            setEditId(null)
            setTodo("");
            setError("")
        }
        else {
            setTodos([...todos,{id : Date.now() , title : todo , done : false}]);
            setError("");
            setTodo("");
        }
    }
    const handleDone = (todoId) => {
        const index = todos.findIndex(todo => todo.id === todoId);
        const dublicateTodos = [...todos];
        dublicateTodos[index] = {
            id : todos[index].id,
            title : todos[index].title,
            done : !todos[index].done
        }
        setTodos(dublicateTodos);
    }
    const handleDelete = (todoId) => {
        if (window.confirm("Are you sure?")){
            const deleteItem = todos.filter(todo => todo.id !== todoId);
            setTodos(deleteItem);
        }
    }
    const handleEdit = (todoId) => {
        const editItem = todos.find(item => item.id === todoId);
        setTodo(editItem.title);
        setToggleSubmit(true);
        setEditId(todoId);
    }
  return (
    <div className="bg-sky-900 min-h-screen">
      <div className="container p-8 flex flex-col items-center gap-4">
          <div className="flex gap-1 items-center">
              <span className="text-8xl text-pink-600"><BsCheckAll/></span>
              <h1 className="md:text-3xl text-2xl font-bold text-amber-500">Todo List App</h1>
          </div>
          <div>
              <form onSubmit={handleSubmit} className="flex items-center bg-black text-amber-50 rounded-full">
                  <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} className="border-0 outline-0 bg-transparent w-60 px-4 py-1"/>
                  <button type="submit" className={`border-4 border-opacity-80 rounded-full border-pink-400 text-3xl ${toggleSubmit ? "text-amber-500" : "text-pink-600"}`}>{toggleSubmit ? <BsPencilSquare/> : <BsPlusCircleFill/>}</button>
              </form>
              <p className="text-red-500 pl-3">{error}</p>
          </div>
          <ListItem todos={todos} handleDone={handleDone} handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>
        {todos.length > 1 && <div className="flex justify-center items-center">
            <button className="bg-red-600 text-white py-1 px-3 rounded transition-all hover:bg-red-500" onClick={() => setTodos([])}>Delete All</button>
        </div>}
    </div>
  );
}

export default App;