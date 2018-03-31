import React from 'react';
import PropTypes from 'prop-types';

const Currency = ({ value, base }) => (
	<div>
		{value} - {base}
	</div>
);

Currency.propTypes = {
	value: PropTypes.string.isRequired,
	base: PropTypes.string,
};

Currency.defaultProps = {
	base: 'USD',
};

export default Currency;