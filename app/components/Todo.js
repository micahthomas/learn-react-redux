import React from "react";
import * as TodoActions from '../actions/TodoActions.js'

export default class Todo extends React.Component {
  static propTypes = {
    complete: React.PropTypes.bool.isRequired,
    edit: React.PropTypes.bool,
    text: React.PropTypes.string
  }

  static defaultProps = {
    complete: false,
    edit: false,
    text: "Empty Todo"
  }

  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {complete, edit, text, id} = this.props;
    const {store} = this.context;

    const icon = complete
      ? "\u2714"
      : "\u2716"

    if (edit) {
      return (
        <li>
          <input value={text} onChange={TodoActions.updateTodo(store, id, {complete, edit, text})} focus="focused"/>
        </li>
      );
    }

    return (
      <li>
        <span>{text}</span>
        <button>{icon}</button>
      </li>
    );
  }
}
