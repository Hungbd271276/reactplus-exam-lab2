import React, { useState } from "react";
import { TodoList } from "../InterfaceTodo";

interface Todo {
   onAdd: (index: any) => void
   onUpdate: (index: TodoList) => void,
   curentTodo: any
}
export const AddProductForm = ({onAdd, onUpdate, curentTodo}: Todo) => {

    const [inputAvatar, setinputAvatar] = useState(curentTodo?.avatar || '');
    const [inputName, setinputName] = useState(curentTodo?.name ||  '');
    const [inputContent, setinputContent] = useState(curentTodo?.content || '');
      
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(curentTodo && onUpdate) {
           onUpdate({id: curentTodo.id, avatar: inputAvatar, name:inputName, content: inputContent})
        }else if(onAdd) {
           onAdd({avatar: inputAvatar, name:inputName, content: inputContent});
        }
        
    };

    return <div>
        <form action="" onSubmit={(e) => handleSubmit(e)} >
        <div className="field-input-group">
            <input placeholder="Image" type="text" required value={inputAvatar} className="ant-input" onChange={(e) => setinputAvatar(e.target.value)}/>
        </div>
        <div className="field-input-group">
            <input placeholder="Product name" type="text" required value={inputName} className="ant-input" onChange={(e) => setinputName(e.target.value)}/>
        </div>
        <div className="field-input-group">
            <input placeholder="Product description" type="text" required value={inputContent} className="ant-input" onChange={(e) => setinputContent(e.target.value)}/>
        </div>
        <div className="modal-new-user-footer">
            <button className="ant-btn ant-btn-primary">
                Save
            </button>
            <button className="ant-btn" style={{marginLeft: 10}} >
                Cancel
            </button>
        </div>
        </form>
    </div>
}
