import * as React from "react";
import { Button, Input, Grid, Header, Icon } from "semantic-ui-react";
import { observer } from "mobx-react";
import todoModel from "../model/todoModel";

function TodoAdd() {
  return (
    <Grid centered columns={1}>
      <Grid.Row>
        <Header as='h2'>Todo App</Header>
      </Grid.Row>
      <Grid.Row>
        <Input className="input-container" fluid value={todoModel.newTodo}
          onChange={(evt: any) => (todoModel.setNewTodo(evt.target.value))}
          placeholder="New todo" />
        <Button className="add-btn" onClick={() => todoModel.addTodo()}><Icon name='add' /> Add</Button>
      </Grid.Row>
    </Grid>
  );
}

export default observer(TodoAdd);