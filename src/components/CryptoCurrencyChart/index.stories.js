import React from 'react';
import { storiesOf } from '@storybook/react';

import CryptoCurrencyChart from './index';

const sourceUrl = "ws://coins-stream.demo.javascript.ninja";

storiesOf('CryptoCurrencyChart', module)
  .add('default', () => <CryptoCurrencyChart currency="BTC" url={sourceUrl} />)
  ;