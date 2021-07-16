import * as React from "react";
import { Button, Input, Checkbox } from "semantic-ui-react";
import { observer } from "mobx-react";
import todoModel from "../model/todoModel";

function CompleteListItems() {
    return (
        <div>
            {todoModel.todosComplete.length > 0 ? (todoModel.todosComplete.map((todo: { id: number; text: string, done: boolean }) => (
                <div key={todo.id}>
                    <Checkbox onClick={() => (todoModel.changeStatusTodo(todo.id, !todo.done))} checked={todo.done} />
                    <Input value={todo.text} onChange={(evt) => (todoModel.editTextTodo(todo.id, evt.target.value))} />
                    <Button onClick={() => {
                        todoModel.removeTodo(todo.id);
                    }}>Delete</Button>
                </div>
            ))) : (
                'Complete something or you are doing nothing :('
            )}
        </div>
    );
}

const ObservedCompleteListItems = observer(CompleteListItems);

function TodoComplete() {
    return (
        <ObservedCompleteListItems />
    );
}

export default TodoComplete;