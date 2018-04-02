import { formatCurrency, toPercent, getDelta } from './util';

describe('Helper util', () => {
	it('should format currency correctly', () => {
		const testSuite = [
			{ input: { value: '123.45', currency: 'USD' }, output: '$123.45' },
			{ input: { value: '123.45234234', currency: 'USD', toFixed: 5 }, output: '$123.45234' },
			{ input: { value: 'invalid number', currency: 'USD' }, output: '' },
			{ input: { value: '5.67', currency: 'unhandled currency' }, output: '5.67' },
		];
		testSuite.forEach(({ input, output }) => {
			expect(formatCurrency(input)).toBe(output);
		});
	});

	it('should convert float number to percent correctly', () => {
		const testSuite = [
			{ input: [1.2345], output: '123.45%' },
			{ input: [1.234534, 3], output: '123.453%' },
			{ input: ['invalid number'], output: '' },
		];
		testSuite.forEach(({ input, output }) => {
			expect(toPercent.apply(toPercent, input)).toBe(output);
		});
	});

	it('should calculate delta correctly', () => {
		const testSuite = [
			{ input: [125, 100], output: 0.25 },
			{ input: [100, 125], output: -0.2 },
			{ input: [100, 'not a number'], output: 0 },
			{ input: [120, 0], output: 1 },
		];
		testSuite.forEach(({ input, output }) => {
			expect(getDelta.apply(toPercent, input)).toBe(output);
		});
	});
});
