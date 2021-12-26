import React from 'react';
import './App.css';
import TodoList from './todolist/todolist.js'
import Typography from "@mui/material/Typography";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1">Todo</Typography>
        <hr />

        <TodoList />
      </header>
    </div>
  );
}

export default App;
