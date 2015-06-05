'use strict';

const Request = require('superagent');
const Dispatcher = require('dispatchers/dispatcher');
const UploadConstants = require('constants/upload_constants');

class UploadActionCreator {
  static upload(endpoint, data) {
    Request
      .post(endpoint)
      .send(data)
      .on('progress', this.progress.bind(this))
      .end( this.complete.bind(this) );
  }

  static progress(e) {
    console.log('progress', e);

    Dispatcher.dispatch({
      actionType: UploadConstants.UPLOAD_PROGRESS,
      loaded: e.loaded,
      total: e.total
    });
  }

  static complete(err, res) {
    console.log('complete', err, res);

    Dispatcher.dispatch({
      actionType: UploadConstants.UPLOAD_COMPLETE,
      error: err,
      response: res
    });
  }
}

module.exports = UploadActionCreator;
