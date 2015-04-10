// i18n
// Load and use polyfill for ECMA-402.

import IntlPolyfill from 'intl';

if (!window.Intl) {
  window.Intl = IntlPolyfill;
  require('intl/locale-data/jsonp/en');
  require('intl/locale-data/jsonp/it');
}

// Chrome on Android bug https://github.com/yahoo/react-intl/issues/91#issuecomment-85591584
if (window.navigator.userAgent.indexOf('Android') >= 0) {
  window.Intl.NumberFormat = IntlPolyfill.NumberFormat;
  window.Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

window.ReactIntl = require('react-intl');
require('react-intl/dist/locale-data/en');
require('react-intl/dist/locale-data/it');


var intlData = {
  en: require('../locales/en.js')
};

export default intlData;
