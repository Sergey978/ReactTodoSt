import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css'

export default class extends Component {
    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem("Drimk Coffee"),
            this.createTodoItem("Make awesome  App"),
            this.createTodoItem("Have a lunch"),
        ]
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);


            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArray = [...before, ...after];

            return {
                todoData: newArray
            };
        });

    };

    addItem = (text) => {

        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {

            // const newArray = todoData.slice(); 
            // the same
            const newArray = [...todoData, newItem];
            return {
                todoData: newArray
            };
        })
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {

            const idx = todoData.findIndex((el) => el.id === id);

            //1. update object
            const oldItem = todoData[idx];
            // new object with toggled done, to prevent changing old object
            const newItem = {...oldItem, important: !oldItem.important};
            //2.  construct new array
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArray = [...before, newItem,...after];

            return {
                todoData: newArray
            };


        })

    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {

            const idx = todoData.findIndex((el) => el.id === id);

            //1. update object
            const oldItem = todoData[idx];
            // new object with toggled done, to prevent changing old object
            const newItem = {...oldItem, done: !oldItem.done};
            //2.  construct new array
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArray = [...before, newItem,...after];

            return {
                todoData: newArray
            };


        })
        
    }

    render() {
        return (
            <div className="todo-app" >
                <AppHeader toDo={1} done={3} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={this.state.todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm
                    onItemAdded={this.addItem} />
            </div>
        );
    }

}
