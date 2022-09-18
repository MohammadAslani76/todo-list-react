import {BsFillTrashFill,BsFillFileCheckFill,BsArrowCounterclockwise,BsPencilSquare} from "react-icons/bs"

const ListItem = ({todos,handleDone,handleDelete,handleEdit}) => {
    if (todos.length < 1) {
        return (
            <div className="flex justify-center items-center px-3 py-2 bg-pink-800 w-72 rounded-full text-white font-bold">
                It's Empty
            </div>
        )
    }
    return (
        todos.map(todo => (
            <div key={todo.id} className={`flex justify-between items-center px-3 py-2 w-72 rounded-full transition-all ${todo.done ? "bg-green-800 opacity-80 order-1" : "bg-pink-800"}`}>
                <span className={todo.done ? "text-white line-through" : "text-white"}>{todo.title}</span>
                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleDone(todo.id)} className="text-green-400 text-xl">{todo.done ? <BsArrowCounterclockwise/> : <BsFillFileCheckFill/>}</button>
                    <button onClick={() => handleEdit(todo.id)} className="text-xl text-amber-400"><BsPencilSquare/></button>
                    <button onClick={() => handleDelete(todo.id)} className="text-red-300 text-xl"><BsFillTrashFill/></button>
                </div>
            </div>
        ))
    );
};

export default ListItem;
