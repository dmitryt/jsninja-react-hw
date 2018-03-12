import { compose, withState, withHandlers, lifecycle, mapProps } from 'recompose';

import Autocomplete from './Autocomplete';

const noop = () => { };

const withItems = compose(
	withState('items', 'setItems', []),
	mapProps(({ getItems, setItems, ...props }) => ({
		...props,
		getItems: value => {
			return getItems(value).then(items => {
				setItems(items);
			});
		}
	}))
);

const withValue = compose(
	withState('inputValue', 'setInputValue', ''),
	withHandlers({
		onInputChange: ({ getItems, onChange = noop, setInputValue }) => ({ displayedValue, value }) => {
			setInputValue(displayedValue);
			getItems(displayedValue);
			onChange(value);
		}
	}),
	lifecycle({
		componentDidMount() {
			if (this.props.value !== undefined) {
				this.initInitialValue(this.props.value);
			}
		},
		componentWillReceiveProps({ value }) {
			if (this.props.value !== value) {
				this.initInitialValue(value);
			}
		},
		initInitialValue(value) {
			const { setInputValue, getItems } = this.props;
			setInputValue(value);
			getItems(value);
		}
	}),
);

const withFocusManagement = compose(
	withState('isFocused', 'setFocused', false),
	mapProps(({ isFocused, ...props }) => ({
		...props,
		isDropdownVisible: isFocused && props.inputValue && props.items.length > 0
	}))
);

export default compose(
	withItems,
	withValue,
	withFocusManagement,
)(Autocomplete);