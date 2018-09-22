import React from "react";

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.input.name]: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.meta.active && this.props.meta.active) {
      this.input.focus();
    }
  }

  updateSearch(target) {
    console.log({ [this.props.input.name]: target.value });
    this.setState({ [this.props.input.name]: target.value });
  }

  render() {
    const Element = this.props.element || "input";

    let error;
    if (this.props.meta.touched && this.props.meta.error) {
      error = <div className="form-error">{this.props.meta.error}</div>;
    }

    let warning;
    if (this.props.meta.touched && this.props.meta.warning) {
      warning = <div className="form-warning">{this.props.meta.warning}</div>;
    }

    let elementStructure = (
      <Element
        {...this.props.input}
        placeholder={this.props.placeholder}
        id={this.props.input.name}
        type={this.props.type}
        ref={input => (this.input = input)}
      />
    );
    if (this.props.element === "select") {
      let options = this.props.options.map((singleOption, i) => {
        return (
          <option key={`${singleOption}` + i} value={singleOption}>
            {singleOption}
          </option>
        );
      });
      elementStructure = (
        <Element
          {...this.props.input}
          id={this.props.input.name}
          ref={input => (this.input = input)}
          onChange={e => this.updateSearch(e.target)}
          value={this.state[this.props.input.name]}
        >
          {options}
        </Element>
      );
    }
    let label;
    if (this.props.label) {
      label = (
        <label htmlFor={this.props.input.name}>
          {this.props.label}
          {error}
          {warning}
        </label>
      );
    }

    return (
      <div className={`form-input ${this.props.input.name}-input`}>
        {label}
        {elementStructure}
      </div>
    );
  }
}
