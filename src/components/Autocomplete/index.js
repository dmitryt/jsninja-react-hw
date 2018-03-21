import { compose, withState, withHandlers, lifecycle, mapProps } from 'recompose';

import Autocomplete from './Autocomplete';

const noop = () => { };

export const withValue = compose(
	withState('items', 'setItems', []),
	withState('inputValue', 'setInputValue', ''),
	withHandlers({
		onInputChange: ({ getItems, setItems, setInputValue, onChange = noop }) => ({ displayedValue, value }) => {
			setInputValue(displayedValue);
			getItems(displayedValue).then(setItems);
			onChange(value);
		}
	}),
	lifecycle({
		componentDidMount() {
			const { value, setInputValue } = this.props;
			if (value !== undefined) {
				setInputValue(value);
			}
		},
		componentWillReceiveProps(nextProps) {
			const { value, setInputValue } = this.props;
			if (nextProps.value !== value) {
				setInputValue(nextProps.value);
			}
		}
	}),
);

export const withFocusManagement = compose(
	withState('isFocused', 'setFocused', false),
	mapProps(({ isFocused, ...props }) => ({
		...props,
		isDropdownVisible: isFocused && props.inputValue && props.items.length > 0
	}))
);

export default compose(
	withValue,
	withFocusManagement,
)(Autocomplete);