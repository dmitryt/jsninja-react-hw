import { compose, withState, withHandlers, lifecycle, mapProps } from 'recompose';

import Price from './Price';

export default compose(
	lifecycle({
		state: { value: 0, basePrice: 0 },
		componentWillMount() {
			const basePrice = this.getLastPrice(this.props.values);
			if (!isNaN(basePrice)) {
				this.setState({ basePrice });
			}
		},
		componentWillReceiveProps({ values }) {
			const newValue = this.getLastPrice(values);
			const { basePrice, value } = this.state;
			const startDelta = basePrice === 0 ? 1 : (newValue - basePrice) / basePrice;
			const lastDelta = value === 0 ? 1 : (newValue - value) / value;
			this.setState({ value: newValue, startDelta, lastDelta });
		},
		getLastPrice(values) {
			return values.slice(-1)[0];
		}
	})
)(Price);
