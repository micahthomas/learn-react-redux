import React from 'react'
import {
  connect
} from 'react-redux'
import * as _ from 'lodash'

import {
  Todo,
  AddTodo
} from '../components/Todo'
import * as TodoActions from '../actions/TodoActions'

const TodoListComponent = ({
  todos,
  createTodo,
  updateTodo,
  deleteTodo
}) => (
  <div>
    <AddTodo createTodo={createTodo}/>
    <h1>Todos</h1>
    <ul>
      {_.map(todos, (todo, id) => (
         <Todo
           key={id}
           id={id}
           {...todo}
           onEdit={updateTodo}
           onDelete={deleteTodo} />
       ))}
    </ul>
  </div>
)

TodoListComponent.propTypes = {
  todos: React.PropTypes.object.isRequired,
  createTodo: React.PropTypes.func.isRequired,
  updateTodo: React.PropTypes.func.isRequired,
  deleteTodo: React.PropTypes.func.isRequired
}

const mapStateToProps = ({
  todos
}) => {
  return {
    todos: todos.list,
    createTodo: (text) => {
      TodoActions.createTodo(todos.ref, text)
    },
    updateTodo: (id, todo) => {
      TodoActions.updateTodo(todos.ref, id, todo)
    },
    deleteTodo: (id) => {
      TodoActions.deleteTodo(todos.ref, id)
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  TodoActions.setUser(dispatch, ownProps.userId)
  return {
    dispatch
  }
}

const TodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListComponent)

export default TodoList
