import React from 'react';
import { mount } from 'enzyme';

import Currency from './index';

describe('Component CryptoCurrencyChart', () => {
	describe('Component Currency', () => {
		const setupComponent = props => mount(<Currency {...props} />);

		it('should renders correctly by default', () => {
			const component = setupComponent({ value: '123' });
			expect(component.text()).toBe('123 - USD');
		});

		it('should renders with provided "base" property correctly', () => {
			const component = setupComponent({ value: '124', base: 'EUR' });
			expect(component.text()).toBe('124 - EUR');
		});
  });
});
