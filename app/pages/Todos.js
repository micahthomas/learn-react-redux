import React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'

import Todo from '../components/Todo'
import * as TodoActions from '../actions/TodoActions'

const TodoListComponent = ({todos, ref, onAddTodo, onTodoEdit, onTodoDelete}) => (
  <div>
    <button onClick={;() => onAddTodo()}>
      Add Todo
    </button>
    <input/>
    <h1>Todos</h1>
    <ul>
      {_.map(todos, (todo, id) => (
         <Todo
           key={id}
           id={id}
           {...todo}
           onEdit={onTodoEdit}
           onDelete={onTodoDelete} />
       ))}
    </ul>
  </div>
)

TodoListComponent.propTypes = {
  todos: React.PropTypes.object.isRequired,
  onAddTodo: React.PropTypes.func.isRequired,
  onTodoEdit: React.PropTypes.func.isRequired,
  onTodoDelete: React.PropTypes.func.isRequired
}

const mapStateToProps = ({todos, ref}) => {
  return {
    todos: todos.list,
    onAddTodo: () => {
      TodoActions.createTodo(todos.ref)
    },
    onTodoEdit: (id, todo) => {
      TodoActions.updateTodo(todos.ref, id, todo)
    },
    onTodoDelete: (id) => {
      TodoActions.deleteTodo(todos.ref, id)
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  TodoActions.setUser(dispatch, ownProps.userId)
  return {dispatch}
}

const TodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListComponent)

export default TodoList
