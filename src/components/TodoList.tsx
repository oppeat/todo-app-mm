import * as React from "react";
import { Button, Input, Checkbox } from "semantic-ui-react";
import { observer } from "mobx-react";
import todoModel from "../model/todoModel";

function TodoListItems() {
    return (
        <div>
            {todoModel.todos.length > 0 ? (todoModel.todos.map((todo: { id: number; text: string, done: boolean }) => (
                <div key={todo.id}>
                    <Checkbox onClick={() => (todoModel.changeStatusTodo(todo.id, !todo.done))} checked={todo.done} />
                    <Input value={todo.text} onChange={(evt) => (todoModel.editTextTodo(todo.id, evt.target.value))} />
                    <Button onClick={() => {
                        todoModel.removeTodo(todo.id);
                    }}>Delete</Button>
                </div>
            ))) : (
                'Nothing to do next - add one :)'
            )}
        </div>
    );
}

const ObservedTodoListItems = observer(TodoListItems);

function TodoList() {
    return (
        <ObservedTodoListItems />
    );
}

export default TodoList;