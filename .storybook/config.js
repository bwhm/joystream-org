import React from 'react';
import { configure } from '@storybook/react';
import { addDecorator, addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withInfo } from '@storybook/addon-info';
import WebFont from 'webfontloader';
import 'intersection-observer';
import smoothscroll from 'smoothscroll-polyfill';

import '../src/styles/global.scss';

WebFont.load({
  google: {
    families: ['Titillium Web:200,400,600,700'],
  },
});

smoothscroll.polyfill();

addParameters({ viewport: { viewports: { ...INITIAL_VIEWPORTS } } });
addDecorator(withInfo);

// automatically import all files ending in *.stories.js
const src = require.context('../src', true, /.stories.js$/);
const common = require.context('../__stories__', true, /.stories.js$/);
function loadStories() {
  src.keys().forEach(filename => src(filename));
  common.keys().forEach(filename => common(filename));
}

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname);
};
configure(loadStories, module);
