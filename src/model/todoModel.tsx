import { makeAutoObservable, action, computed } from "mobx";
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// GET    /todolist
// POST   /todolist -> JSON Body { title:string }
// PUT    /todolist/{id} -> JSON Body { title:string }
// DELETE /todolist/{id}

const updateTodo = async (todos: Todo[], id: number, title:string,  done:boolean): Promise<Todo> => {
  let res = await axios.put(`http://localhost:3600/todolist/${id}`, { title, done })
  return res.data
};

const removeTodo = async (todos: Todo[], id: number): Promise<Todo[]> => {
  let res = await axios.delete(`http://localhost:3600/todolist/${id}`)
  if(res.status === 200){
    return todos.filter((todo) => todo.id !== id);
  }
  return todos;
}

const addTodo = async ( title: string): Promise<Todo[]> => {
  let res = await axios.post(`http://localhost:3600/todolist`, { title })
  return res.data
}

class Todos {
  todos: Todo[] = [];
  newTodo: string = "";

  constructor() {
    makeAutoObservable(this);
  }
  @action setNewTodo(val: string) {
    this.newTodo = val
  }

  @action setTodos(val: any) {
    this.todos = val
  }

  @action setTodoTitle(oldTodo: Todo ,value: string ){
    oldTodo.title = value;
  }

  @action setTodoDone(oldTodo: Todo ,value: boolean ){
    oldTodo.done = value;
  }

  @computed get todosPending(){
    return this.todos.filter(todo => !todo.done)
  }

  @computed get todosComplete(){
    return this.todos.filter(todo => todo.done)
  }

  async updateTodo(id: number,text:string, done:boolean) {
    const res = await updateTodo(this.todos, id, text,done);
    let oldTodo = this.todos.find((todo) => todo.id === id)
    if(oldTodo){
      this.setTodoTitle(oldTodo,res.title)
      this.setTodoDone(oldTodo,res.done)
    }
  }

  localUpdateTodo(id: number,text:string, done:boolean) {
    let oldTodo = this.todos.find((todo) => todo.id === id)
    if(oldTodo){
      this.setTodoTitle(oldTodo,text)
      this.setTodoDone(oldTodo,done)
    }
  }

  async removeTodo(id: number) {
    let res = await removeTodo(this.todos, id);
    this.setTodos(res)
  }

  async addTodo() {
    const res = await addTodo(this.newTodo);
    this.setTodos([...this.todos, res])
    this.setNewTodo('');
  }

  load() {
    axios.get('http://localhost:3600/todolist')
      .then((resp) => resp.data)
      .then((tds: Todo[]) => (this.setTodos(tds)));
  }
}

const store = new Todos();

export default store;