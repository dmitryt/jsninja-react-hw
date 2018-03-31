import { compose, withState, withHandlers, lifecycle, mapProps } from 'recompose';

import Price from './Price';

export default compose(
	lifecycle({
		componentWillMount() {
			this.setState({ basePrice: this.getLastPrice(this.props.values) });
		},
		componentWillReceiveProps({ values }) {
			const value = this.getLastPrice(values);
			const { basePrice } = this.state;
			const delta = basePrice === 0 ? 1 : (value - basePrice) / basePrice;
			this.setState({ value, delta });
		},
		getLastPrice(values) {
			return values.slice(-1)[0];
		}
	})
)(Price);
