import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import {TodoStore} from "../stores/TodoStore";

export default class TodoPage extends React.Component {
  constructor() {
    super();
    this.state = TodoStore.getState();
    this.loadTodos = this.loadTodos.bind(this);
  }

  componentWillMount() {
    this.unsubscribe = TodoStore.subscribe(this.loadTodos);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  loadTodos() {
    this.setState(TodoStore.getState());
  }

  // createTodo() {
  //     TodoActions.createTodo(Date.now());
  // }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  render() {
    const {todos} = this.state;

    const TodoComponents = todos.map((todo) => {
      return <Todo key={todo.id} {...todo}/>;
    });

    return (
      <div>
        <button onClick={this.reloadTodos.bind(this)}>Reload!</button>
        <input/>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
      </div>
    )
  }
}
