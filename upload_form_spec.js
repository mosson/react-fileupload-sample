'use strict';

const UploadForm = require('components/upload_form');
const UploadActionCreator = require('action_creators/upload_action_creator');

describe('UploadForm', () => {
  var component, onResponse;

  onResponse = jasmine.createSpy();

  beforeEach( (done) => {
    component = React.render(<UploadForm action='/hoge'/>, document.body);
    setTimeout(done);
  });

  afterEach( (done) => {
    React.unmountComponentAtNode(document.body); // Assuming mounted to document.body
    document.body.innerHTML = "";                // Just to be sure :-P
    setTimeout(done);
  });

  describe('methods', () => {
    describe('isLegacy()', () => {
      it('FormDataを扱えない場合はiframeによる非同期アップロードにする', () => {
        var oldFormData = windowFormData;
        window.FormData = undefined;
        expect(component.isLegacy()).toEqual(true);

        window.FormData = oldFormData;
        expect(component.isLegacy()).toEqual(false);
      });
    });

    describe('isLegacy8()', () => {
      it('IE8の場合はクリックポリシーのためさらに複雑な手順のコンポーネントにする' , () => {
        var oldDocumentMode = document.documentMode;

        document.documentMode = 8;
        expect(component.isLegacy8()).toEqual(true);

        document.documentMode = oldDocumentMode;
        expect(component.isLegacy8()).toEqual(false);
      });
    });

    describe('send (file)', () => {
      it('UploadActionCreator.uploadにファイル名とファイルの内容を送る', () => {
        window.FormData = function() {

        }

        window.FormData.prototype.append = jasmine.createSpy();

        spyOn(UploadActionCreator)

        component.send({
          name: 'hoge'
        });

        expect(window.FormData.prototype.append).toHaveBeenCalledWith({name: 'hoge'});

        expect(UploadActionCreator.upload).toHaveBeenCalledWith('/hoge', 'hoge', new window.FormData());
      });
    });
  });
});
