import React from 'react';
import PropTypes from 'prop-types';

import Currency from './Currency';
import Price from './Price';
import Chart from './Chart';

import './style.css';

const CryptoCurrencyChart = ({ values, width, height, currency, baseCurrency, maxChartValues }) => (
	<div className="b-crypto-chart" style={{ width }}>
		<div className="b-crypto-chart__info">
			<Currency value={currency} />
			<Price value={values.slice(-1)[0]} currency={baseCurrency} />
		</div>
		<Chart width={width} height={height} values={values} xValues={maxChartValues} />
	</div>
);

CryptoCurrencyChart.propTypes = {
	dataProvider: PropTypes.object.isRequired,
	currency: PropTypes.string.isRequired,
	values: PropTypes.arrayOf(Number),
	baseCurrency: PropTypes.string,
	maxChartValues: PropTypes.number,
	height: PropTypes.number,
	width: PropTypes.number,
};

CryptoCurrencyChart.defaultProps = {
	baseCurrency: 'USD',
	maxChartValues: 20,
	values: [],
	height: 200,
	width: 600,
};

export default CryptoCurrencyChart;