import React from "react";

export default class Todo extends React.Component {
  static propTypes = {
    complete: React.PropTypes.bool.isRequired,
    edit: React.PropTypes.bool,
    text: React.PropTypes.string
  }

  static defaultProps = {
    complete: false,
    edit: false,
    text: "No Text"
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {complete, edit, text} = this.props;

    const icon = complete
      ? "\u2714"
      : "\u2716"

    if (edit) {
      return (
        <li>
          <input value={text} focus="focused"/>
        </li>
      );
    }

    return (
      <li>
        <span>{text}</span>
        <span>{icon}</span>
      </li>
    );
  }
}
