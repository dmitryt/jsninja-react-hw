import React from 'react';
import { storiesOf } from '@storybook/react';

import Autocomplete from './index';

const simpleItems = [
	{ value: 'robertdeniro', label: 'Robert De Niro' },
	{ value: 'tomhanks', label: 'Tom Hanks' },
	{ value: 'russellcrowe', label: 'Russell Crowe' },
];

const listOfCryptoCurrencies = [
  { value: 'eth', label: 'ETH', balance: 12.34 },
  { value: 'etc', label: 'ETC', balance: 11.25 },
];

const getItems = (items = simpleItems) => text => {
  const result = items.filter(i => i.label.includes(text));
  return Promise.resolve(result);
};

const CustomDropdownListItem = ({ label, balance }) => <span><b>{label}</b>&nbsp;(balance: {balance})</span>

storiesOf('Autocomplete', module)
  .add('default', () => <Autocomplete getItems={getItems()} />)
  .add('with provided value', () => <Autocomplete getItems={getItems()} value="some label3" />)
  .add('with customized dropdown list item', () => <Autocomplete getItems={getItems(listOfCryptoCurrencies)} ListItemComponent={CustomDropdownListItem} />)
  ;