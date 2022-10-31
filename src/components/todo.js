import { useRef } from "react";

const Todo = (props) => {
    const checkboxRef = useRef();
    const textRef = useRef();

    const OnKey = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            props.editTodo(null, textRef.current.value);
            textRef.current.value = "";
        }
    }


    return (
        <div className={`todo d-flex flex-row justify-content-between align-content-center ${props.roundedTop?'rounded-top':''} ${props.roundedBottom?'rounded-bottom':''} ${props.borderTop?'border-top-gray':''}`}>
            <input ref={checkboxRef} className="m-4" type="checkbox" />
            <input ref={textRef} className="flex-grow-1 border border-0 me-2"
                type="text" placeholder='Create a new todo...'
                onKeyDown={OnKey}
            />
        </div>
    );
}

export default Todo;
