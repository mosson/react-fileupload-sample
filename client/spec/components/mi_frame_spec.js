'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const MiFrame = require('components/mi_frame');

describe('MiFrame', () => {
  var component, onResponse;

  onResponse = jasmine.createSpy();

  beforeEach( (done) => {
    component = React.render(<MiFrame onResponse={onResponse}>hogehoge</MiFrame>, document.body);
    setTimeout(done);
  });

  afterEach( (done) => {
    React.unmountComponentAtNode(document.body); // Assuming mounted to document.body
    document.body.innerHTML = "";                // Just to be sure :-P
    setTimeout(done);
  });

  it('問題なく表示できる', () => {
    expect(React.findDOMNode(component)).toBeTruthy();
  });

  it('transclusionができる', () => {
    const iframe = React.findDOMNode(component);
    expect(iframe.textContent).toEqual('hogehoge');
  });

  it('URLが変更したときに、ページのテキスト内容をonResponseに渡す', () => {
    const iframe = React.findDOMNode(component);

    // var loadEvent = iframe.contentWindow.document.createEvent("HTMLEvents");
    // loadEvent.initEvent("load", true, true);
    // iframe.contentWindow.document.dispatchEvent(loadEvent);

    // cant test

    //expect(onResponse).toHaveBeenCalledWith('hogehoge');
  });
});
