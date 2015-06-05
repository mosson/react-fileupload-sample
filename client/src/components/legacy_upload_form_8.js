'use strict';

const React = require('react/addons');
const MiFrame = require('components/mi_frame');
const UploadActionCreator = require('action_creators/upload_action_creator');
const LegacyUploadForm = require('components/legacy_upload_form');

class LegacyUploadForm8 extends LegacyUploadForm {
  render () {
    return (
      <div>
        <MiFrame style={this.hiddenStyle()} name={this.serialId} onResponse={this.responseHdl.bind(this)}></MiFrame>

        <form {...this.props} target={this.serialId} method="post" ref="form" encType="multipart/form-data">
          <input ref="file" type="file" accept="image/*" name="file"/>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

module.exports = LegacyUploadForm8;
