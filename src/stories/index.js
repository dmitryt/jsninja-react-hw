import React from 'react';
import { storiesOf } from '@storybook/react';

import Autocomplete from '../components/Autocomplete';

const simpleItems = [
  { value: 'some value', label: 'some label' },
  { value: 'some value2', label: 'some label2' },
  { value: 'some value3', label: 'some label3' },
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