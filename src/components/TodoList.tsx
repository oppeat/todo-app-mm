import * as React from "react";
import { Button, Input, Checkbox, Segment, Label, Icon } from "semantic-ui-react";
import { observer } from "mobx-react";
import todoModel from "../model/todoModel";

function TodoListItems() {
  return (
    <Segment raised>
      <Label attached='top left' color="yellow" ribbon floating>On-going</Label>
      {(todoModel.todosPending.length > 0 &&
        <Segment.Group piled>
          {todoModel.todosPending.map((todo: { id: number; text: string, done: boolean }) => (
            <Segment key={todo.id}>
              <Checkbox onClick={() => (todoModel.changeStatusTodo(todo.id, !todo.done))} checked={todo.done} />
              <Input className="input-inline-container" value={todo.text} onChange={(evt) => (todoModel.editTextTodo(todo.id, evt.target.value))} />
              <Button icon onClick={() => {
                todoModel.removeTodo(todo.id);
              }}><Icon name='trash alternate outline'/></Button>
            </Segment>
          ))}
        </Segment.Group>)
        || 'Nothing to do next - add one :)'}
    </Segment>
  );
}

const ObservedTodoListItems = observer(TodoListItems);

function TodoList() {
  return (
    <ObservedTodoListItems />
  );
}

export default TodoList;