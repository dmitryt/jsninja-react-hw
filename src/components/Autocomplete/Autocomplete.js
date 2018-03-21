import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const DefaultDropdownListItem = ({ label }) => <span>{label}</span>

const Autocomplete = ({ inputValue, isDropdownVisible, setFocused, items, onInputChange, ListItemComponent }) => (
	<div className="b-autocomplete">
		<input
			type="text"
			className="b-autocomplete-input"
			onChange={e => onInputChange({ displayedValue: e.target.value, value: null })}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			value={inputValue}
		/>
		{isDropdownVisible && (
			<div className="b-autocomplete-result">
				{
					items.map(props =>
						<p className="b-autocomplete-result__item" key={props.value} onMouseDown={() => onInputChange({ displayedValue: props.label, value: props.value })}>
							<ListItemComponent {...props} />
						</p>
					)
				}
			</div>
		)}
	</div>
);

Autocomplete.propTypes = {
	getItems: PropTypes.func.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  ListItemComponent: PropTypes.func,
};

Autocomplete.defaultProps = {
	value: '',
	onChange: () => {},
	ListItemComponent: DefaultDropdownListItem,
};

export default Autocomplete;