import React from 'react';

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
						<p key={props.value} onMouseDown={() => onInputChange({ displayedValue: props.label, value: props.value })}>
							<ListItemComponent {...props} />
						</p>
					)
				}
			</div>
		)}
	</div>
);

Autocomplete.defaultProps = {
	ListItemComponent: DefaultDropdownListItem,
	items: [],
};

export default Autocomplete;