import React from "react";

import Todo from "../components/Todo";
import * as _ from 'lodash';
import * as TodoActions from "../actions/TodoActions";

export default class TodoPage extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    this.render = this.render.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  componentWillMount() {
    let {userId} = this.props;
    let {store} = this.context;
    TodoActions.setUser(store, userId);
    this.unsubscribe = store.subscribe(this.render);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addTodo() {
    let {store} = this.context;
    TodoActions.createTodo(store, {completed: false, text: 'Hello World!'});
  }

  render() {
    console.log("Render Called!");
    const {store} = this.context;
    const {todos} = store.getState().todos;
    const TodoComponents = _.map(todos, (todo, id) => <Todo key={id} id={id} {...todo} store={store} />);
    console.log('render called', TodoComponents)
    return (
      <div>
        <button onClick={this.addTodo}>Add Todo</button>
        <input/>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
      </div>
    )
  }
}
