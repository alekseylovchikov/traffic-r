import React from 'react';

import SvgIcon from './SvgIcon';
import Loading from './Loading';

// Tabs wrapper
class Tabs extends React.Component {

  static displayName = 'Tabs';

  static propTypes = {
    children          : React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ]).isRequired,

    isLoading         : React.PropTypes.bool,
    loadingType       : React.PropTypes.string,

    tabsClassName     : React.PropTypes.string.isRequired,
    contentClassName  : React.PropTypes.string.isRequired,
    switcherClassName : React.PropTypes.string.isRequired,

    selected          : React.PropTypes.number,

    onClick           : React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  state = {
    selected: this.props.selected
  };

  componentWillReceiveProps(props) {
    this.setState({
      selected: props.selected
    });
  }

  handleClick = (index, event) => {
    event.preventDefault();

    this.props.onClick(index);
  };

  _renderTabs() {

    function createTab (child, index) {

      let className = child.props.className;
      let icon = '';

      if (child.props.classNameUnique) {
        className += ' ' + className + '--' + child.props.classNameUnique;
      }

      if (this.state.selected === index) {
        className += ' ' + child.props.className + '--active';
      }

      const iconClassNameActive = (this.state.selected === index) ? (child.props.iconClassName + '--active') : '';
      const iconClassNameUnique = (child.props.classNameUnique) ? (child.props.iconClassName + '--' + child.props.classNameUnique) : '';
      const iconClassName       = child.props.iconClassName + ' ' + iconClassNameUnique + ' ' + iconClassNameActive + ' icon';

      const xlinkHref = 'svgicon__' + child.props.classNameUnique;

      // Check if we have an icon specified for this tab
      if (child.props.iconClassName) {
        icon = <SvgIcon className={iconClassName} imageID={xlinkHref} />;
      }

      return (
        <div key={index} className={className} onClick={this.handleClick.bind(null, index)}>
          {icon}
          {child.props.label}
        </div>
      )
    }

    return (
      <div className={this.props.switcherClassName}>
        {this.props.children.map(createTab.bind(this))}
      </div>
    )
  }

  _renderContent() {
    return (
      <div className={this.props.contentClassName}>
        {this.props.children[this.state.selected]}
        <Loading active={this.props.isLoading} type={this.props.loadingType} />
      </div>
    )
  }

  render() {
    return (
      <div className={this.props.tabsClassName}>
        {this._renderTabs()}
        {this._renderContent()}
      </div>
    )
  }
}

class Tab extends React.Component {

  static displayName = 'Tab';

  static propTypes = {
    children: React.PropTypes.element.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

export { Tabs, Tab };
