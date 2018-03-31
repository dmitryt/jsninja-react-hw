const CURRENCY_PREFIX = {
	USD: '$',
	EUR: '€',
	HRN: '₴',
};

function formatNumber(value, toFixed) {
	const [int, decimal] = parseFloat(value, 10).toFixed(toFixed).split('.');
	const formatted = Array.from({length: int.length}).reduce((acc, _, i) => {
		if (i > 0 && (int.length - i) % 3 === 0) {
			acc += ',';
		}
		return acc + int[i];
	}, '');
	return `${formatted}.${decimal}`;
}

export function formatCurrency({ value, currency, toFixed = 2 }) {
	const prefix = CURRENCY_PREFIX[currency];
	if (isNaN(parseFloat(value, 10))) {
		return '';
	}
	return [prefix, formatNumber(value, toFixed)].filter(Boolean).join(' ');
}

export function toPercent(floatNumber, toFixed = 2) {
	return `${(floatNumber * 100).toFixed(toFixed)}%`;
}

export default {
	formatCurrency,
	toPercent,
};