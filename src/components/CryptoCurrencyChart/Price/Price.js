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
		<span className={className(lastDelta)}>{formatCurrency({ value, currency })}</span>
		&nbsp;<span className={className(startDelta)}>({toPercent(startDelta)})</span>
	</div>
);

Price.propTypes = {
	value: PropTypes.number.isRequired,
	startDelta: PropTypes.number,
	lastDelta: PropTypes.number,
};

Price.defaultProps = {
	startDelta: 0,
	lastDelta: 0,
};

export default Price;