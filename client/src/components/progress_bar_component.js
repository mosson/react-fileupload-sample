'use strict';

const React = require('react/addons');
const Dispatcher = require('dispatchers/dispatcher');
const UploadConstants = require('constants/upload_constants');

class ProgressBarComponent extends React.Component {
  render () {
    const style = {
      display: 'block',
      height: '20px',
      width: `${this.props.per * 100}%`,
      backgroundColor: 'red',
      transition: '0.2s width ease-in-out',
      margin: '20px 0px',
      padding: '0px',
      color: 'white'
    };

    return (
      <div style={style}>{this.props.name}</div>
    );
  }
}

module.exports = ProgressBarComponent;
