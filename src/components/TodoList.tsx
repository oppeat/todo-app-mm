import * as React from "react";
import { Button, Input, Checkbox, Segment, Label, Icon } from "semantic-ui-react";
import { observer } from "mobx-react";
import todoModel from "../model/todoModel";

let typeTimeout : any = 0; 

const updateTodo = (id: number, title: string, done: boolean) => {
  todoModel.localUpdateTodo(id, title, done)
  if(typeTimeout) clearTimeout(typeTimeout);
  typeTimeout = setTimeout(() => {
    todoModel.updateTodo(id, title, done)
  }, 600);
};

function TodoListItems() {
  return (
    <Segment raised>
      <Label attached='top left' color="yellow" ribbon floating>On-going</Label>
      {(todoModel.todosPending.length > 0 &&
        <Segment.Group piled>
          {todoModel.todosPending.map((todo: { id: number, title: string, done: boolean }) => (
            <Segment key={todo.id}>
              <Checkbox onClick={() => todoModel.updateTodo(todo.id, todo.title, !todo.done)} checked={todo.done} />
              <Input className="input-inline-container" value={todo.title} onChange={(evt) => updateTodo(todo.id, evt.target.value, todo.done)} />
              <Button icon color="red" onClick={() => {
                todoModel.removeTodo(todo.id);
              }}><Icon name='trash alternate outline' /></Button>
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