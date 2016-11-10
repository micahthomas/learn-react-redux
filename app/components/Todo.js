import React from 'react'
import * as TodoActions from '../actions/TodoActions.js'

export class Todo extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    complete: React.PropTypes.bool.isRequired,
    edit: React.PropTypes.bool,
    text: React.PropTypes.string
  }

  static defaultProps = {
    complete: false,
    edit: false,
    text: 'Empty Todo'
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {
      complete,
      edit,
      text,
      id,
      onEdit,
      onDelete
    } = this.props

    const icon = complete ?
      '\u2714' :
      '\u2716'

    const todoComponent = edit ?
      <input
        value={text}
        onChange={(event) => onEdit(id, {text: event.target.value})}
        onBlur={() => onEdit(id, {edit: false})}
        focus='focused'/> :
      <span onClick={() => onEdit(id, {edit: true})}>{text}</span>

    return (
      <li>
        {todoComponent}
        <button onClick={() => onDelete(id)}>{icon}</button>
      </li>
    )
  }
}

export class AddTodo extends React.Component {
  static propTypes = {
    createTodo: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.input = null
  }

  render() {
    const {
      createTodo
    } = this.props
    return (

      <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!this.input.value.trim()) {
          return
        }
        createTodo(this.input.value)
        this.input.value = ''
      }}>
        <input ref={node => {
          this.input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
    )
  }
}
