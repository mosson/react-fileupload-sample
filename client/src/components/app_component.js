'use strict';

const React = require('react/addons');
const UploadForm = require('components/upload_form');
const ProgressBarComponent = require('components/progress_bar_component');
const UploadStore = require('stores/upload_store');
const UploadConstants = require('constants/upload_constants');
const _ = require('lodash');

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.bindedProgressHandle = this.progressHandle.bind(this);

    this.state = {
      progresses: {}
    };
  }

  progressHandle() {
    this.setState({
      progresses: UploadStore.queue,
      completes: UploadStore.completes
    });
  }

  componentDidMount () {
    UploadStore.addListener(UploadConstants.STORE_CHANGED, this.bindedProgressHandle);
  }

  componentWillUnmount () {
    UploadStore.removeListener(UploadConstants.STORE_CHANGED, this.bindedProgressHandle);
  }

  render () {
    var progresses = _.map(this.state.progresses, (value, id) => {
      return (
        <ProgressBarComponent key={id} name={value.name} per={value.loaded / value.total}/>
      );
    });

    var completes = _.map(this.state.completes, (response, i) => {
      var url = '';
      try {
        url = JSON.parse(response).url;
      } catch(e) {
        url = '';
      }

      return (
        <img key={i} src={url}/>
      );
    });


    return (
      <div>
        Hello, React
        <UploadForm multiple="multiple" action="/upload"/>
        {progresses}

        <div>
          {completes}
        </div>
      </div>
    );
  }
}

module.exports = AppComponent;
