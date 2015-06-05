'use strict';

const React = require('react/addons');
const MiFrame = require('components/mi_frame');
const UploadActionCreator = require('action_creators/upload_action_creator');

class LegacyUploadForm extends React.Component {
  constructor (props) {
    super(props);
    this.serialId = "LegacyUploadForm" + parseInt(Math.random() * 10000, 10);
  }

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

  hiddenStyle () {
    return {
      position: 'absolute',
      top: '-7878px',
      left: '-7878px',
      opacity: 0,
      width: 0,
      height: 0
    };
  }

  render () {
    const style = this.hiddenStyle();

    return (
      <div>
        <MiFrame style={style} name={this.serialId} onResponse={this.responseHdl.bind(this)}></MiFrame>

        <form {...this.props} target={this.serialId} method="post" ref="form" encType="multipart/form-data">
          <input ref="file" onChange={this.submitHdl.bind(this)} type="file" accept="image/*" name="file"/>
        </form>
      </div>
    );
  }
}

module.exports = LegacyUploadForm;
