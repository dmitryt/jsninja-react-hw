import { compose, lifecycle } from 'recompose';

import Price from './Price';
import { getDelta } from '../../../helpers/util';

export default compose(
	lifecycle({
		state: {},
		componentWillMount() {
			const { value } = this.props;
			if (value !== undefined) {
				this.setState({ previousValue: value, basePrice: value });
			}
		},
		componentWillReceiveProps({ value }) {
			let { previousValue = value, basePrice = value } = this.state;
			const startDelta = getDelta(value, basePrice);
			const lastDelta = getDelta(value, previousValue);
			this.setState({ previousValue: value, basePrice, startDelta, lastDelta });
		}
	})
)(Price);
