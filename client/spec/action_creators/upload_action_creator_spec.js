'use strict';

const UploadActionCreator = require('action_creators/upload_action_creator');
const Dispatcher = require('dispatchers/dispatcher');
const UploadConstants = require('constants/upload_constants');
const Request = require('superagent');

describe('UploadActionCreator', () => {
  describe('getId ()', () => {
    it('一意のIDを返す', () => {
      var a = UploadActionCreator.getId();
      var b = UploadActionCreator.getId();

      expect(a).not.toEqual(b);
    });
  });

  describe('upload(endpoint, name, data)', () => {
    it('アップロードを開始する', () => {
      spyOn(Dispatcher, 'dispatch');
      spyOn(UploadActionCreator, 'getId').and.returnValue('hoge');

      const request = {
        send: function(){
          return this;
        },

        on: function(){
          return this;
        },

        end: function(fn){
          fn(null, 'complete');
        }
      }

      spyOn(request, 'send').and.callThrough();
      spyOn(request, 'end').and.callThrough();
      spyOn(Request, 'post').and.callFake(() => {
        return request;
      });
      spyOn(UploadActionCreator, 'complete');

      UploadActionCreator.upload('https://example.com/upload', 'neko.jpg', '1847689357837829');

      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        id: 'hoge',
        name: 'neko.jpg',
        actionType: UploadConstants.UPLOAD_START
      });
      

      expect(Request.post).toHaveBeenCalledWith('https://example.com/upload');
      expect(request.send).toHaveBeenCalledWith('1847689357837829');
      expect(UploadActionCreator.complete).toHaveBeenCalledWith('hoge', null, 'complete');
    });
  });

  describe('progress(id, e)', () => {
    it('アップロードの進捗を通知する', () => {
      spyOn(Dispatcher, 'dispatch');

      UploadActionCreator.progress('hoge', {loaded: 0.73, total: 1});

      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        id: 'hoge',
        actionType: UploadConstants.UPLOAD_PROGRESS,
        loaded: 0.73,
        total: 1
      });
    });
  });

  describe('complete(id, err, res)', () => {
    it('アップロード完了の通知をする', () => {
      spyOn(Dispatcher, 'dispatch');

      UploadActionCreator.complete('id', null, 'complete');

      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        id: 'id',
        actionType: UploadConstants.UPLOAD_COMPLETE,
        error: null,
        response: 'complete'
      });
    });
  });
});
