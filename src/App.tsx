import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import './styles/global.css';
import 'semantic-ui-css/semantic.min.css';
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import TodoComplete from "./components/TodoComplete";
import todoModel from "./model/todoModel";
import Particles from 'react-particles-js';
import config from './config/particlesjs-config.json';

function App() {

  const onLoad = () => {
    todoModel.load(
      "https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json"
    );
  };

  useEffect(() => {
    onLoad();
  }, []);

  const particleConfig : any = config

  return (
    <div className="App" style={{ position: 'relative', overflow: "hidden" }}>
      <div style={{ position: 'absolute' }}>
        <Particles height="100vh" width="100vw" params={particleConfig} />
      </div>
      <div style={{ height: '100vh', overflowX: 'hidden', overflowY: 'auto', background: 'lightslategrey' }}>
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
    </div>
  );
}

export default App;
