'use strict';

const React = require('react/addons');
const UploadActionCreator = require('action_creators/upload_action_creator');
const LegacyUploadForm = require('components/legacy_upload_form');

class UploadForm extends React.Component {
  isLegacy() {
    return window.FormData === undefined;
  }

  submitHdl() {
    const fileInput = React.findDOMNode(this.refs.file);

    if (fileInput.multiple === true) {
      for (var i = 0, len = fileInput.files.length; i < len; i++) {
        this.send(fileInput.files[i]);
      }
    } else {
      this.send(fileInput.files.item(0));
    }
  }

  send (file) {
    const fileData = new FormData();
    fileData.append('file', file);
    UploadActionCreator.upload(this.props.action, file.name, fileData);
  }

  legacyForm() {
    return (
      <LegacyUploadForm {...this.props}/>
    );
  }

  modernForm() {
    return (
      <form encType="multipart/form-data">
        <input {...this.props} ref="file" onChange={this.submitHdl.bind(this)} type="file" accept="image/*" name="file"/>
        {this.props.children}
      </form>
    );
  }

  render () {
    //const form = this.isLegacy() ? this.legacyForm() : this.modernForm();
    const form = this.legacyForm();

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
