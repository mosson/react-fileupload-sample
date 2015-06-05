'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const AppComponent = require('components/app_component');

describe('AppComponent', () => {
  var component;

  beforeEach( (done) => {
    component = TestUtils.renderIntoDocument(<AppComponent/>);
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
});
