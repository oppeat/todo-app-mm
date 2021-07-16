import { makeAutoObservable, action, computed } from "mobx";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const editTextTodo = (todos: Todo[], id: number, text:string): void => {
  let oldTodo = todos.find((todo) => todo.id === id)
  if(oldTodo){
    oldTodo.text = text
  }
};

const changeStatusTodo = (todos: Todo[], id: number, status:boolean): void => {
  let oldTodo = todos.find((todo) => todo.id === id)
  if(oldTodo){
    oldTodo.done = status
  }
};

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

class Todos {
  todos: Todo[] = [];
  newTodo: string = "";

  constructor() {
    makeAutoObservable(this);
  }
  @action setNewTodo(val: string) {
    this.newTodo = val
  }

  @computed get todosPending(){
    return this.todos.filter(todo => !todo.done)
  }

  @computed get todosComplete(){
    return this.todos.filter(todo => todo.done)
  }

  editTextTodo(id: number,text:string) {
    editTextTodo(this.todos, id, text);
  }

  changeStatusTodo(id: number,status:boolean) {
    changeStatusTodo(this.todos, id, status);
  }

  removeTodo(id: number) {
    this.todos = removeTodo(this.todos, id);
  }

  addTodo() {
    this.todos = addTodo(this.todos, this.newTodo);
    this.newTodo = "";
  }

  load(url: string) {
    fetch(url)
      .then((resp) => resp.json())
      .then((tds: Todo[]) => (store.todos = tds));
  }
}

const store = new Todos();

export default store;