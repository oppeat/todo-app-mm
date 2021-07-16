import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import TodoComplete from "./components/TodoComplete";
import todoModel from "./model/todoModel";

function App() {

  const onLoad = () => {
    todoModel.load(
      "https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json"
    );
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className="App">
      <Grid centered columns={1}>
        <Grid.Row>
          <TodoAdd />
        </Grid.Row>
        <Grid.Row>
          <TodoList />
        </Grid.Row>
        <Grid.Row>
          <TodoComplete />
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
