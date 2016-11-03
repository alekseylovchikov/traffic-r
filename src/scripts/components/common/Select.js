import React from 'react';

import ScrollArea from 'react-scrollbar/dist/no-css';

class Select extends React.Component {

  static displayName = 'Select';

  static propTypes = {
    options  : React.PropTypes.array.isRequired,
    optional : React.PropTypes.bool,
    selected : React.PropTypes.any,
    onChange : React.PropTypes.func
  };

  static defaultProps = {
    label    : null,
    optional : false
  };

  constructor(props) {
    super(props);
  }

  state = {
    opened: false
  };

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeOptionsList);
  }

  handleOnClick = () => {

    this.setState({
      opened: true
    });

    document.body.addEventListener('click', this.closeOptionsList);
  };

  handleChange = (value) => {

    if (this.props.selected === value) {
      return;
    }

    // Perform an outside event if any
    if (this.props.onChange) {
      this.props.onChange(this.props.options[value].value);
    }
  };

  closeOptionsList = () => {
    this.setState({
      opened: false
    });
  };

  render() {

    const { options, selected, optional } = this.props;
    const { opened } = this.state;

    let selectedItem = {};
    let classNameOption;

    // Open/close state
    let classNameCurrent   = (opened) ? 'select__current select__current--clicked' : 'select__current';
    const classNameOptions = (opened) ? 'select__options select__options--opened'  : 'select__options';

    // Generate list of options
    let selectedItemOptionalText;

    const optionsList = options.map((option, i) => {

      let optionalText;

      if (option.value === selected) {
        selectedItem = option;
        classNameOption = 'select__option select__option--selected';
      } else {
        classNameOption = 'select__option';
      }

      // Add label option
      if (!option.value) {
        classNameOption += ' select__option--label';

        if (optional) {
          optionalText = (<span>{'(opt.)'}</span>);
        }
      }

      return (<div className={classNameOption} key={i} onClick={this.handleChange.bind(null, i)}>{option.label}{optionalText}</div>);
    });

    // Add class to selected option if it is a label option
    if (!selectedItem.value) {
      classNameCurrent += ' select__current--label';

      if (optional) {
        selectedItemOptionalText = (<span>{'(opt.)'}</span>);
      }
    }

    return (
      <div className="select">
        <div className={classNameCurrent} onClick={this.handleOnClick}>
          {selectedItem.label}{selectedItemOptionalText}
        </div>
        <div className={classNameOptions}>
          <ScrollArea
            className="select__scroll"
            horizontal={false}
            smoothScrolling
          >
            {optionsList}
          </ScrollArea>
        </div>
      </div>
    )
  }
}

export default Select;
