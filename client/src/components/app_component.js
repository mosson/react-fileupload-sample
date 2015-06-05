'use strict';

const React = require('react/addons');
const UploadForm = require('components/upload_form');

class AppComponent extends React.Component {
  render () {
    return (
      <div>
        Hello, React
        <UploadForm action="/upload"/>
      </div>

    );
  }
}

module.exports = AppComponent;
