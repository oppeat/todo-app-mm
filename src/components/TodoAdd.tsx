import * as React from "react";
import { Button, Input, Grid, Header } from "semantic-ui-react";
import { observer } from "mobx-react";
import todoModel from "../model/todoModel";

function TodoAdd() {
	return (
		<Grid centered columns={1}>
			<Grid.Row>
				<Header as='h2'>Todo App</Header>
			</Grid.Row>
			<Grid.Row>
				<Input value={todoModel.newTodo}
					onChange={(evt) => (todoModel.setNewTodo(evt.target.value))}
					placeholder="New todo" />
				<Button  onClick={() => todoModel.addTodo()}>Add Todo</Button>
			</Grid.Row>
		</Grid>
	);
}

export default observer(TodoAdd);