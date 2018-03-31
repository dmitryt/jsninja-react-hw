import React from 'react';
import PropTypes from 'prop-types';

import Currency from './Currency';
import Price from './Price';
import Chart from './Chart';

import './style.css';

const CryptoCurrencyChart = ({ values, currency, baseCurrency, maxChartValues }) => (
	<div className="b-crypto-chart">
		<Currency value={currency} />
		<Price values={values} currency={baseCurrency} />
		<Chart width={600} height={200} values={values.slice(-maxChartValues)} />
	</div>
);

CryptoCurrencyChart.propTypes = {
	currency: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	values: PropTypes.arrayOf(Number),
	baseCurrency: PropTypes.string,
	maxChartValues: PropTypes.number,
};

CryptoCurrencyChart.defaultProps = {
	values: [],
	baseCurrency: 'USD',
	maxChartValues: 50,
};

export default CryptoCurrencyChart;