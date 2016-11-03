import React from 'react';

class Input extends React.Component {

  static displayName = 'Input';

  static propTypes = {
    wrapperClassName : React.PropTypes.string.isRequired,
    inputClassName   : React.PropTypes.string.isRequired,
    type             : React.PropTypes.string.isRequired,
    name             : React.PropTypes.string.isRequired,
    value            : React.PropTypes.string,
    labelClassName   : React.PropTypes.string,
    labelText        : React.PropTypes.string,
    optional         : React.PropTypes.bool,
    onChange         : React.PropTypes.func
  };

  static defaultProps = {
    optional: false
  };

  handleOnChange = (e) => {
    const data = {};

    data[e.target.name] = e.target.value;

    this.props.onChange(data);
  };

  handleOnLabelClick = () => {
    this._input.focus();
  };

  render() {

    const { wrapperClassName, inputClassName, type, name, value, labelClassName, labelText, optional } = this.props;

    let inputLabelText, inputLabel, optionalText;

    if (!value) {
      inputLabelText = (labelClassName) ? labelText : null;
      optionalText   = (labelClassName && optional) ? (<span>{'(opt.)'}</span>) : null;

      inputLabel     = (labelClassName) ? (<label className={labelClassName} onClick={this.handleOnLabelClick}>{inputLabelText} {optionalText}</label>) : null;
    }

    return (
      <div className={wrapperClassName}>
        {inputLabel}
        <input ref={(c) => this._input = c} className={inputClassName} type={type} name={name} defaultValue={value} onChange={this.handleOnChange} />
      </div>
    );
  }

}

export default Input;
