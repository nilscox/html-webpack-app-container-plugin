const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlWebpackAppContainerPlugin {

  constructor(options) {
    this.options = {
      autoClose: false,
      tagName: 'div',
      ...options,
    };
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlWebpackAppContainerPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'HtmlWebpackAppContainerPlugin',
        (data, cb) => {
          this.injectAppContainerTag(data);
          cb(null, data)
        }
      );
    })
  }

  getTagName() {
    return this.options.tagName;
  }

  getAttributes() {
    const { tagName, autoClose, ...attributes } = this.options;

    return Object.keys(attributes).reduce((attrs, name) => [...attrs, `${name}="${attributes[name]}"`], []);
  }

  injectAppContainerTag(data) {
    const { options } = this;
    const tagName = this.getTagName();
    const tagAttributes = this.getAttributes();
    const tagStart = `<${tagName} `;
    const tagEnd = options.autoClose ? ' />' : `></${tagName}>`;

    const tag = [tagStart, tagAttributes.join(' '), tagEnd].join('');

    // If there's a better way, please let me knew
    data.html = data.html.replace(/<body[^>]*>/, (match) => {
      return [match, tag].join('\n  ');
    });
  }
}

module.exports = HtmlWebpackAppContainerPlugin;
