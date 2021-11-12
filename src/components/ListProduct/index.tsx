import './ListProduct.css'
import { TodoList } from '../InterfaceTodo';
import Item from 'antd/lib/list/Item';

interface Todo {
    onTodoList: TodoList[],
    ondelete: (index: string) => void
    onEdit: (index: TodoList) => void
}


export const ListProduct = ({onTodoList, ondelete,onEdit}: Todo) => {
 
    return <div className="ant-list-items">
        {
            onTodoList.map((todo) => (
                <div className="ant-list-item" key={todo.id}>
            <div className="ant-list-item-meta">
                <div className="ant-list-item-meta-avatar">
                    <span className="ant-image-img">
                        <img src={`${todo.avatar}`} style={{width: 100}}/>
                    </span>
                </div>
                <div className="ant-list-item-meta-content">
                    <h4 className="ant-list-item-meta-title">
                        <a>{todo.name}</a>
                    </h4>
                    <div className="ant-list-item-meta-description">
                      {todo.content}
                    </div>
                </div>
                <ul className="ant-list-item-action">
                    <li>
                        <a onClick={() => onEdit(todo)} >Edit</a>
                    </li>
                    <li>
                        <a onClick={() => ondelete(todo.id)}>Remove</a>
                    </li>
                </ul>
            </div>
         </div>
            ))
        }
    </div>
}