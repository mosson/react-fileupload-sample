'use strict';

const React = require('react/addons');

class MiFrame extends React.Component {
  constructor () {
    this.bindedLoadHdl = this.loadHdl.bind(this);
    this.state = {seed: 0};
  }

  loadHdl () {
    const iframe = React.findDOMNode(this);
    const doc = iframe.contentDocument;
    const html = doc.children[0];

    if( this.props.onResponse ) this.props.onResponse(html.textContent);

    this.redraw();
  }

  redraw () {
    this.setState({
      seed: this.state.seed++
    });
  }

  componentDidMount () {
    const iframe = React.findDOMNode(this);
    iframe.removeEventListener('load', this.bindedLoadHdl);
    iframe.addEventListener('load', this.bindedLoadHdl);

    this.renderFrameContents();
  }

  componentDidUpdate () {
    this.renderFrameContents();
  }

  componentWillUnmount () {
    const iframe = React.findDOMNode(this);
    iframe.removeEventListener('load', this.bindedLoadHdl);

    React.unmountComponentAtNode(
      React.findDOMNode(this).contentDocument.body
    );
  }

  render () {
    return (
      <iframe target={this.props.target} />
    );
  }

  renderFrameContents () {
    const html = React.findDOMNode(this);
    if( !html ) return;

    const doc = html.contentDocument;
    if( !doc ) return;

    if( doc.readyState === 'complete' ) {
       var contents = (
         <div>
           {this.props.children}
         </div>
       );

       React.render(contents, doc.body);
    } else {
       setTimeout(this.renderFrameContents.bind(this), 0);
    }
  }
}

MiFrame.defaultProps = {
  target: '_self'
};

MiFrame.propTypes = {
  target: React.PropTypes.string,
  onResponse: React.PropTypes.func
};

module.exports = MiFrame;
