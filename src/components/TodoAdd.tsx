import * as React from "react";
import { Button, Input, Grid, Header, Icon } from "semantic-ui-react";
import { observer } from "mobx-react";
import todoModel from "../model/todoModel";

function TodoAdd() {
  return (
    <Grid centered columns={1}>
      <Grid.Row>
        <Header as='h2' inverted>
        <Icon.Group size="big">
          <Icon name='sticky note outline' />
          <Icon corner='top right' name='pencil' />
        </Icon.Group>
          <div style={{ padding: '0 1em'}}>
          Todo App
          </div>
        </Header>
      </Grid.Row>
      <Grid.Row>
        <Input className="input-container" fluid value={todoModel.newTodo}
          onChange={(evt: any) => (todoModel.setNewTodo(evt.target.value))}
          placeholder="Type in what you gonna do ~~" />
        <Button primary className="add-btn" onClick={() => todoModel.addTodo()}><Icon name='add' /> Add</Button>
      </Grid.Row>
    </Grid>
  );
}

export default observer(TodoAdd);