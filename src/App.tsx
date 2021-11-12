import React, {useEffect, useState} from 'react';
import { Modal } from 'antd';

import {ListProduct} from './components/ListProduct'
import {AddProductForm} from './components/AddProductForm'

import 'antd/dist/antd.css'
import './App.css';
import { TodoList } from './components/InterfaceTodo';
import axios from 'axios';
function App() {

    const [isModalVisible, setIsModalVisible] = useState(false);
      
     const [todoList, setTodoList] = useState<TodoList[]>([]);
     const [curentTodo, setCurentTodo] = useState<TodoList | null>(null);

     // List Todo
     useEffect(() => {
           const getTodo = async () => {
               const {data} = await axios.get(`https://5d36d86c86300e0014b647c7.mockapi.io/products`);
               setTodoList(data);
           }
           getTodo();
     },[])

     // addTodo
     const handleAdd = async (todo: TodoList) => {
         try {
             const {data} = await axios.post(`https://5d36d86c86300e0014b647c7.mockapi.io/products`, todo);
             setTodoList([
                 ...todoList,
                 data
             ]);
         } catch (error) {
             console.log(error);
         }
     }

     // Delete 
     const handleDelete = async (id: string) => {
         try {
             const onDelete = window.confirm('Bạn có muốn xóa không');
             if(onDelete) {
                 await axios.delete(`https://5d36d86c86300e0014b647c7.mockapi.io/products/${id}`);
                 const newTodo = todoList.filter(todo => todo.id !== id);
                 setTodoList(newTodo);
             }
         } catch (error) {
             console.log(error);
         }
     }

     // Update
    const handleEditProduct = (itemTodo: TodoList) => {
        setCurentTodo(itemTodo);
        setIsModalVisible(true)
    } 

     const handleUpdate = async (todo: TodoList) => {
         try {
            const { data } = await axios.put(`https://5d36d86c86300e0014b647c7.mockapi.io/products/${todo.id}`, todo);
            // console.log(data);
              const newTodo = todoList.map(item => (item.id === todo.id ? data : todo));
             setTodoList(newTodo)
         } catch (error) {
             console.log(error);
         }
     }

     

    const handleOpenModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <div className="App">
            <h2>List product</h2>
            <div className="header-add-user">
                <button className="ant-btn ant-btn-primary" onClick={handleOpenModal}>
                    Add New Product
                </button>
            </div>
            <ListProduct onTodoList={todoList} ondelete={handleDelete} onEdit={handleEditProduct} />
            <Modal title="Add Product" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <AddProductForm curentTodo={curentTodo}  onAdd={handleAdd} onUpdate={handleUpdate}/>
            </Modal>
        </div>
    );
}

export default App;
