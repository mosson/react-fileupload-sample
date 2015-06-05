'use strict';

const React = require('react/addons');
const MiFrame = require('components/mi_frame');
const UploadActionCreator = require('action_creators/upload_action_creator');

class LegacyUploadForm extends React.Component {
  submitHdl () {
    const iframe = React.findDOMNode(this);
    const form = React.findDOMNode(this.refs.form);

    form.submit();
  }

  componentWillUnmount () {
    const iframe = React.findDOMNode(this);
  }

  responseHdl (text) {
    UploadActionCreator.complete(0, null, text);
  }

  render () {
    return (
      <MiFrame target="_self" onResponse={this.responseHdl.bind(this)}>
        <form {...this.props} method="post" ref="form" encType="multipart/form-data">
          <input ref="file" onChange={this.submitHdl.bind(this)} type="file" accept="image/*" name="file"/>
        </form>
      </MiFrame>
    );
  }
}

module.exports = LegacyUploadForm;
