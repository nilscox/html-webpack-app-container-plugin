# HTMLWebpackPlugin App container

This plugin injects a tag into the html body, something like
`<div id="app"></div>`.

## Installation

```sh
42sh$ npm i --save-dev html-webpack-app-container-plugin
```

```sh
42sh$ yarn add -D html-webpack-app-container-plugin
```

## Usage

In the `plugins` section of your webpack configuration, register this plugin
with:

```javascript
const HtmlWebpackAppContainerPlugin = require('html-webpack-app-container-plugin');

module.exports = {
  // ...
  plugin: [
    new HtmlWebpackAppContainerPlugin({ id: 'app' }),
  ],
};
```

This will inject a `div` with id `app` right after the `<body>` tag. All the
options passed to the plugin will be
forwarded as the element's attributes, except for:

- `tagName` (string): set the tag's name (default is `div`)
- `autoClose` (boolean): make the tag auto closed

## Contributing

I don't plane to add more features to this plugin, but issues and pull request
are always welcome.
