import { useRef } from "react";

const Todo = (props) => {
    const checkboxRef = useRef(false);
    const textRef = useRef();

    const callEditTodo = () => {
        const todo = { 
            todoId: props.todoItem.todoId,
            todoTitle: textRef.current.value,
            checked: checkboxRef.current.checked
        }
        props.editTodo(todo);
    }

    const OnKey = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (props.addTodo) {
                const todo = { 
                    todoId: Date.now(),
                    todoTitle: textRef.current.value,
                    checked: checkboxRef.current.checked
                }
                props.addTodo(todo);
                checkboxRef.current.checked = false;
                textRef.current.value = "";
            } else {
                callEditTodo();
            }
        }
    }

    const toggle = (e) => {
        // if (props.editTodo) callEditTodo();
        props.editTodo && callEditTodo();
    }

    return (
        <div className={`todo d-flex flex-row justify-content-between align-content-center ${props.roundedTop ? 'rounded-top' : ''} ${props.roundedBottom ? 'rounded-bottom' : ''} ${props.borderTop ? 'border-top-gray' : ''}`}>
            <input ref={checkboxRef} className="m-4" type="checkbox"
                defaultChecked={props.todoItem ? props.todoItem.checked : false}
                onChange={toggle}
            />
            <input ref={textRef} className={`flex-grow-1 border border-0 me-2 ${checkboxRef.current.checked ? 'text-decoration-line-through' : ''}`}
                type="text" placeholder='Create a new todo...'
                onKeyDown={OnKey}
                defaultValue={props.todoItem ? props.todoItem.todoTitle : ''}
            />
        </div>
    );
}

export default Todo;
