'use strict';

const React = require('react/addons');
const UploadActionCreator = require('action_creators/upload_action_creator');

class UploadForm extends React.Component {
  isLegacy() {
    return window.FormData === undefined;
  }

  submitHdl() {
    const fileInput = React.findDOMNode(this);
    const fileData = new FormData(fileInput);

    UploadActionCreator.upload(this.props.action, fileData);
  }

  legacyForm() {
    return (
      <div>This is Legacy Form</div>
    );
  }

  modernForm() {
    return (
      <form encType="multipart/form-data">
        <input ref="file" onChange={this.submitHdl.bind(this)} type="file" accept="image/*" name="file"/>
      </form>
    );
  }

  render () {
    const form = this.isLegacy() ? this.legacyForm() : this.modernForm();

    return form;
  }
}

UploadForm.defaultProps = {
  action: ''
};

UploadForm.propTypes = {
  action: React.PropTypes.string.isRequired
};

module.exports = UploadForm;
