import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { formatCurrency, toPercent } from '../../../helpers/util';

const className = value => classNames({
	increased: value > 0,
	decreased: value < 0,
});

const Price = ({ value, currency, startDelta, lastDelta }) => (
	<div>
		<span className={`price ${className(lastDelta)}`}>{formatCurrency({ value, currency })}</span>
		&nbsp;<span className={`delta ${className(startDelta)}`}>({toPercent(startDelta, 4)})</span>
	</div>
);

Price.propTypes = {
	currency: PropTypes.string.isRequired,
	value: PropTypes.number,
	startDelta: PropTypes.number,
	lastDelta: PropTypes.number,
};

Price.defaultProps = {
	value: 0,
	startDelta: 0,
	lastDelta: 0,
};

export default Price;