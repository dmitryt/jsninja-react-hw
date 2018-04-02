import React from 'react';
import { mount } from 'enzyme';

import WrappedComponent from './index';
import Chart from './Chart';

describe('Component CryptoCurrencyChart', () => {
	describe('Component Chart', () => {
		const setupComponent = (props, Component = WrappedComponent) => mount(<Component {...props} />);
		const getChart = c => c.find(Chart);

		it('should render chart correctly', () => {
			const component = setupComponent({ values: [1,2,3,4], polygonValues: [4,5,6,7], height: 100, width: 300, color: 'green' }, Chart);
			const rootNode = component.find('svg').getDOMNode();
			const chartNode = component.find('polyline').getDOMNode();
			const bgdNode = component.find('polygon').getDOMNode();
			const lineNode = component.find('line').getDOMNode();

			expect(rootNode.getAttribute('width')).toBe('300');
			expect(rootNode.getAttribute('height')).toBe('100');

			expect(chartNode.getAttribute('points')).toBe('1 2 3 4');
			expect(chartNode.getAttribute('stroke')).toBe('green');

			expect(bgdNode.getAttribute('points')).toBe('4 5 6 7');
			expect(bgdNode.getAttribute('fill')).toBe('green');

			expect(lineNode.getAttribute('x1')).toBe('0');
			expect(lineNode.getAttribute('y1')).toBe('100');
			expect(lineNode.getAttribute('x2')).toBe('300');
			expect(lineNode.getAttribute('y2')).toBe('100');
		});

		it('should calculate chart coordinates correctly', () => {
			const component = setupComponent({
				values: [100, 200, 500], // max:500, min:100
				height: 100,
				width: 100,
				xValues: 5,
			});
			const chartComponent = getChart(component);

			expect(chartComponent.prop('values')).toEqual([50, 100, 75, 75, 100, 0]);
		});

		it('should calculate background coordinates correctly', () => {
			const component = setupComponent({
				values: [100, 200, 500],
				height: 100,
				width: 100,
				xValues: 5,
			});
			const chartComponent = getChart(component);

			expect(chartComponent.prop('polygonValues')).toEqual([50, 100, 50, 100, 75, 75, 100, 0, 100, 100]);
		});
  });
});
