'use strict';

const React = require('react/addons');
const UploadActionCreator = require('action_creators/upload_action_creator');
const LegacyUploadForm = require('components/legacy_upload_form');
const LegacyUploadForm8 = require('components/legacy_upload_form_8');

class UploadForm extends React.Component {
  isLegacy() {
    return window.FormData === undefined;
  }

  isLegacy8() {
    return document.documentMode === 8;
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

  legacyForm8() {
    return (
      <LegacyUploadForm8 {...this.props}/>
    );
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

  resolveForm () {
    if( !this.isLegacy() ) return this.modernForm();
    if( !this.isLegacy8() ) return this.legacyForm();
    return this.legacyForm8();
  }

  render () {
    const form = this.resolveForm();

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
