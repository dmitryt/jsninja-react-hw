import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { formatCurrency, toPercent } from '../../../helpers/util';

const className = value => classNames({
	increased: value > 0,
	decreased: value < 0,
});

const Price = ({ value, currency, delta }) => (
	<div>
		{formatCurrency({ value, currency })} (<span className={className(value)}>{toPercent(delta)}</span>)
	</div>
);

Price.propTypes = {
	value: PropTypes.number.isRequired,
};

Price.defaultProps = {
};

export default Price;