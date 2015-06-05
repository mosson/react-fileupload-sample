'use strict';

const UploadStore = require('stores/upload_store');
const Dispatcher = require('dispatchers/dispatcher');
const UploadConstants = require('constants/upload_constants');

describe('UploadStore', () => {
  it('アップロードされたファイルの状況を保持し、変更があればイベントを発行する', () => {
    expect(UploadStore.queue).toEqual({});
    expect(UploadStore.completes).toEqual([]);
    spyOn(UploadStore, 'emit');

    Dispatcher.dispatch({
      actionType: UploadConstants.UPLOAD_START,
      id: 1,
      name: 'neko.jpg'
    });

    expect(UploadStore.emit).toHaveBeenCalledWith(UploadConstants.STORE_CHANGED);

    Dispatcher.dispatch({
      actionType: UploadConstants.UPLOAD_START,
      id: 2,
      name: 'saru.jpg'
    });

    expect(UploadStore.emit).toHaveBeenCalledWith(UploadConstants.STORE_CHANGED);

    expect(UploadStore.queue).toEqual({
      1: {
        name: 'neko.jpg',
        loaded: 0,
        total: 1
      },
      2: {
        name: 'saru.jpg',
        loaded: 0,
        total: 1
      }
    });

    expect(UploadStore.emit).toHaveBeenCalledWith(UploadConstants.STORE_CHANGED);

    Dispatcher.dispatch({
      actionType: UploadConstants.UPLOAD_PROGRESS,
      id: 2,
      name: 'saru.jpg',
      loaded: 0.73,
      total: 1
    });

    expect(UploadStore.queue).toEqual({
      1: {
        name: 'neko.jpg',
        loaded: 0,
        total: 1
      },
      2: {
        name: 'saru.jpg',
        loaded: 0.73,
        total: 1
      }
    });

    Dispatcher.dispatch({
      actionType: UploadConstants.UPLOAD_COMPLETE,
      id: 1,
      error: null,
      response: { url: '/public/neko.jpg' }
    });

    expect(UploadStore.emit).toHaveBeenCalledWith(UploadConstants.STORE_CHANGED);

    expect(UploadStore.queue).toEqual({
      2: {
        name: 'saru.jpg',
        loaded: 0.73,
        total: 1
      }
    });

    expect(UploadStore.completes).toEqual([
      { url: '/public/neko.jpg'}
    ]);

  });
});
