import React from 'react';
import { shallow } from 'enzyme';

import CryptoService from '../../services/cryptoService';
import WrappedComponent from './index';
import CryptoCurrencyChart from './CryptoCurrencyChart';
import Chart from './Chart';
import Currency from './Currency';
import Price from './Price';

let mockSubscribeCb = () => {};
const mockCloseConnection = jest.fn();
jest.mock('../../services/cryptoService', () => {
	return jest.fn().mockImplementation(() => {
		return {
			subscribe: cb => {
				mockSubscribeCb = cb;
				return { close: mockCloseConnection };
			}
		};
	});
});

describe('Component CryptoCurrencyChart', () => {
	describe('Component Base', () => {
		beforeEach(() => {
			CryptoService.mockClear();
		});

		const setupComponent = (props, Component = WrappedComponent) => shallow(<Component {...props} />);

		it('should render component correctly', () => {
			const component = setupComponent({ values: [1, 2, 3, 4], currency: 'BTC', height: 100, width: 300, maxChartValues: 30 }, CryptoCurrencyChart);
			const chart = component.find(Chart);
			const currency = component.find(Currency);
			const price = component.find(Price);

			expect(chart.prop('values')).toEqual([1, 2, 3, 4]);
			expect(chart.prop('width')).toBe(300);
			expect(chart.prop('height')).toBe(100);
			expect(chart.prop('xValues')).toBe(30);

			expect(currency.prop('value')).toBe('BTC');

			expect(price.prop('value')).toBe(4);
			expect(price.prop('currency')).toBe('USD');
		});

		it('should provide values correctly', () => {
			const component = setupComponent({ currency: 'BTC', maxChartValues: 30 });
			mockSubscribeCb(2343.23);
			mockSubscribeCb(1233.12);
			component.update();

			expect(component.find(CryptoCurrencyChart).prop('values')).toEqual([2343.23, 1233.12]);
		});

		it('should unsubscribe service correctly', () => {
			const component = setupComponent({ currency: 'BTC', maxChartValues: 30 });
			component.unmount();

			expect(mockCloseConnection).toHaveBeenCalled();
		});
	});
});
