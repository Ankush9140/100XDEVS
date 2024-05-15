import React, { useEffect, useState, memo, useMemo, useCallback, useContext, createContext, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {todoList, filteringState,filteringSearchState,filteredTodosList,todoListStat} from "./store"

function App() {
    const todos = useRecoilValue(filteredTodosList);

    return (
        <>
        <TodoCreator></TodoCreator>
        <OptionChooser></OptionChooser>
        <Stats></Stats>
        {todos.map((item)=>{
            return <TODO key={todos.indexOf(item)} todo={item}></TODO>
        })}

        </>
    )
}
function TODO({todo}){
    const [todoLists, setTodoLists] = useRecoilState(todoList);

    const index = todoLists.findIndex(listItem => listItem === todo);

    function deleteItem() {
        setTodoLists(() => {
            return [...todoLists.slice(0, index), ...todoLists.slice(index + 1)]
        })
    }

    function toggleItem() {
        const newItem = {
            ...todo,
            isCompleted: !todo.isCompleted,
        }
        setTodoLists(() => {
            return [...todoLists.slice(0, index), newItem, ...todoLists.slice(index + 1)]
        })
    }

    return (
        <div style={{ padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <div style={{ border: '1px solid black', padding: '5px', width: '500px' }}>
                <h3>{todo.title}</h3>
                <p>{todo.desc}</p>
            </div>
            <input type="checkbox" onChange={toggleItem} checked={todo.isCompleted} name="" id="" />
            <button onClick={deleteItem}>X</button>
        </div>
    )
}

function OptionChooser(){
    const setTodoLists = useSetRecoilState(todoList);
    const [filterSelect, setFilterSelect] = useRecoilState(filteringState)

    const setFilterSearch = useSetRecoilState(filteringSearchState);

    function updateFilter(e) {
        // console.log(e.target.value);
        setFilterSelect(e.target.value)
    }

    function updateSearchFilter(e) {
        setFilterSearch(e.target.value);
    }

    return (
        <div>
            <select value={filterSelect} onChange={updateFilter}>
                <option value="Show All">All</option>
                <option value="Show Completed">Completed</option>
                <option value="Show Incompleted">Incompleted</option>
            </select>

            <input type="text" onChange={updateSearchFilter} placeholder="search"/>
        </div>
    )

}

function TodoCreator(){
    const [todo, setTodo] = useRecoilState(todoList);
    const [title,setTitle] = useState('');
    const [desc,setDesc] = useState('');
    let id = 0;
    if(todo.length != 0){
    id = todo[todo.length-1].id;
    }
    function getId(){
        id++;
        return id;
    }
    function setter(){
        const newTodo = [...todo,{
            id : getId(),
            title : title,
            desc : desc,
        }];
        setTodo(newTodo);
        setTitle('');
        setDesc('');
    }
    return(
        <div>
            <input type='text' placeholder='Title' onChange={function(e){
                setTitle(e.target.value);
            }}></input><br></br>
            <input type='text' placeholder='Description' onChange={function(e){
                setDesc(e.target.value);
            }}></input><br></br>
            <button onClick={setter}>Add Todo</button>
        </div>
    )
}
function Stats(){
    const allValue = useRecoilValue(todoListStat);
    return(
        <div>
            <p>Total : {allValue.total}</p>
            <p>Completed : {allValue.completed}</p>
            <p>Incompleted : {allValue.incompleted}</p>
            <p>Percentage : {allValue.percentage.toFixed(2)}%</p>
        </div>
    )
}


export default App;


