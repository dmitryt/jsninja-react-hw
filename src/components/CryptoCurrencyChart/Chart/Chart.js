import React from 'react';
import PropTypes from 'prop-types';

const Chart = ({ values, polygonValues, color, height, width }) => (
	<svg height={height} width={width} version="1.1" xmlns="http://www.w3.org/2000/svg">
		<polyline points={values.join(' ')}
			stroke={color}
			fill="transparent"
			strokeWidth="2"
		/>
		<polygon points={polygonValues.join(' ')} fill={color} fillOpacity="0.2" />
		<line x1="0" y1={height} x2={width} y2={height} stroke="green" strokeWidth="4" />
	</svg>
);

Chart.propTypes = {
	values: PropTypes.arrayOf(Number).isRequired,
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	color: PropTypes.string,
};

Chart.defaultProps = {
	color: 'red',
};

export default Chart;