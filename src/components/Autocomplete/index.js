import { compose, withState, withHandlers, lifecycle, mapProps } from 'recompose';

import Autocomplete from './Autocomplete';

const noop = () => { };

let lastPromise = null;

export const withItems = compose(
	withState('items', 'setItems', []),
	mapProps(({ getItems, setItems, ...props }) => ({
		...props,
		getItems: value => {
			if (lastPromise && typeof lastPromise.abort === 'function') {
				lastPromise.abort();
				lastPromise = null;
			}
			lastPromise = getItems(value);
			lastPromise
				.then(setItems)
				.then(() => lastPromise = null)
				.catch(() => lastPromise = null) // Promise#finally doesn't work in tests
				;
		}
	}))
)

export const withValue = compose(
	withState('inputValue', 'setInputValue', ''),
	withHandlers({
		onInputChange: ({ getItems, setInputValue, onChange = noop }) => ({ displayedValue, value }) => {
			setInputValue(displayedValue);
			getItems(displayedValue);
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
	withItems,
	withValue,
	withFocusManagement,
)(Autocomplete);