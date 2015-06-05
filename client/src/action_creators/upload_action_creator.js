'use strict';

const Request = require('superagent');
const Dispatcher = require('dispatchers/dispatcher');
const UploadConstants = require('constants/upload_constants');

class UploadActionCreator {
  static getId () {
    this.incrementPoint = (this.incrementPoint || 0);
    return ++this.incrementPoint;
  }

  static upload(endpoint, name, data) {
    const id = this.getId();

    Dispatcher.dispatch({
      id: id,
      name: name,
      actionType: UploadConstants.UPLOAD_START
    });

    Request
      .post(endpoint)
      .send(data)
      .on('progress', (evt) => {
        this.progress(id, evt);
      })
      .end( (err, res) => {
        this.complete(id, err, res);
      });
  }

  static progress(id, e) {
    Dispatcher.dispatch({
      id: id,
      actionType: UploadConstants.UPLOAD_PROGRESS,
      loaded: e.loaded,
      total: e.total
    });
  }

  static complete(id, err, res) {
    Dispatcher.dispatch({
      id: id,
      actionType: UploadConstants.UPLOAD_COMPLETE,
      error: err,
      response: res
    });
  }
}

module.exports = UploadActionCreator;
