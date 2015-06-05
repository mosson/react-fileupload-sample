'use strict';

const EventEmitter = require('eventemitter2').EventEmitter2;
const Dispatcher = require('dispatchers/dispatcher');
const UploadConstants = require('constants/upload_constants');

class UploadStore extends EventEmitter {
  constructor(props) {
    super(props);

    this.queue = {};
    this.completes = [];

    Dispatcher.register((payload) => {
      if( payload.actionType === UploadConstants.UPLOAD_START ){
        this.queue[payload.id] = {
          name: payload.name,
          loaded: 0,
          total: 1
        };
        this.emit(UploadConstants.STORE_CHANGED);
      }

      if( payload.actionType === UploadConstants.UPLOAD_PROGRESS ){
        this.queue[payload.id].loaded = payload.loaded;
        this.queue[payload.id].total = payload.total;

        this.emit(UploadConstants.STORE_CHANGED);
      }

      if( payload.actionType === UploadConstants.UPLOAD_COMPLETE ){
        delete this.queue[payload.id];
        this.completes.push(payload.response);
        this.emit(UploadConstants.STORE_CHANGED);
      }
    });
  }
}

module.exports = new UploadStore();
