const CURRENCY_PREFIX = {
	USD: '$',
	EUR: '€',
	HRN: '₴',
};

function formatPrice(value, toFixed) {
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
	return [prefix, formatPrice(value, toFixed)].filter(Boolean).join('');
}

export function toPercent(floatNumber, toFixed = 2) {
	if (isNaN(floatNumber)) {
		return '';
	}
	return `${(floatNumber * 100).toFixed(toFixed)}%`;
}

export function getDelta(newValue, oldValue) {
	if (isNaN(newValue) || isNaN(oldValue)) {
		return 0;
	}
	return oldValue === 0 ? 1 : (newValue - oldValue) / oldValue;
}

export default {
	formatCurrency,
	toPercent,
	getDelta,
};