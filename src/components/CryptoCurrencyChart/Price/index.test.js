import React from 'react';
import { mount } from 'enzyme';

import Price from './index';

describe('Component CryptoCurrencyChart', () => {
	describe('Component Price', () => {
		const setupComponent = props => mount(<Price {...props} />);
		const getPrice = c => c.find('.price');
		const getDelta = c => c.find('.delta');

		it('should renders correctly by default', () => {
			const component = setupComponent({ value: 123.45, currency: 'USD' });
			expect(getPrice(component).text()).toBe('$123.45');
			expect(getDelta(component).text()).toBe('(0.0000%)');
		});

		it('should detect changing of price correctly', () => {
			const component = setupComponent({ value: 100, currency: 'USD' });

			component.setProps({ value: 124.45 });
			expect(getPrice(component).text()).toBe('$124.45');
			expect(getPrice(component).hasClass('increased')).toBeTruthy();
			expect(getPrice(component).hasClass('decreased')).toBeFalsy();

			component.setProps({ value: 123.45 });
			expect(getPrice(component).text()).toBe('$123.45');
			expect(getPrice(component).hasClass('increased')).toBeFalsy();
			expect(getPrice(component).hasClass('decreased')).toBeTruthy();
		});

		it('should detect changing of delta price correctly', () => {
			const component = setupComponent({ value: 100, currency: 'USD' });

			component.setProps({ value: 124.45 });
			expect(getDelta(component).text()).toBe('(24.4500%)');
			expect(getDelta(component).hasClass('increased')).toBeTruthy();
			expect(getDelta(component).hasClass('decreased')).toBeFalsy();

			component.setProps({ value: 123.45 });
			expect(getDelta(component).text()).toBe('(23.4500%)');
			expect(getDelta(component).hasClass('increased')).toBeTruthy();
			expect(getDelta(component).hasClass('decreased')).toBeFalsy();

			component.setProps({ value: 99.45 });
			expect(getDelta(component).text()).toBe('(-0.5500%)');
			expect(getDelta(component).hasClass('increased')).toBeFalsy();
			expect(getDelta(component).hasClass('decreased')).toBeTruthy();
		});
	});
});
