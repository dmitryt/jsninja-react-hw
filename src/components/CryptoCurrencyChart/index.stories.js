import React from 'react';
import { storiesOf } from '@storybook/react';

import CryptoCurrencyChart from './index';
import { CryptoDataProvider, DummyDataProvider } from '../../services/cryptoDataProvider';

const sourceUrl = "ws://coins-stream.demo.javascript.ninja";
const dataProvider = new CryptoDataProvider({ url: sourceUrl });
// const dataProvider = new DummyDataProvider({ range: [7000, 7500] });
storiesOf('CryptoCurrencyChart', module)
	.add('default', () => <CryptoCurrencyChart currency="BTC" dataProvider={dataProvider} />)
	;