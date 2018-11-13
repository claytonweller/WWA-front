import React from "react";
import { connect } from "react-redux";

class Input extends React.Component {
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

  updateInput(target) {
    this.setState({ [this.props.input.name]: target.value });
    if (this.props.action) {
      this.props.dispatch(this.props.action(target.value));
    }
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
      let placeholder;
      if (this.props.placeholder) {
        placeholder = (
          <option key={`${this.props.placeholder}`} value="" disabled>
            {this.props.placeholder}
          </option>
        );
      }

      elementStructure = (
        <Element
          {...this.props.input}
          id={this.props.input.name}
          ref={input => (this.input = input)}
          onChange={e => {
            this.updateInput(e.target);
            if (this.props.handleChange) {
              this.props.handleChange(e.target.value);
            }
          }}
          value={this.state[this.props.input.name]}
        >
          {placeholder}
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

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Input);
