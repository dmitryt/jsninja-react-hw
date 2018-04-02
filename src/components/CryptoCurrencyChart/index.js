import { compose, lifecycle } from 'recompose';

import CryptoCurrencyChart from './CryptoCurrencyChart';

export default compose(
	lifecycle({
		state: { values: [] },
		componentDidMount() {
			const { dataProvider, currency, maxChartValues } = this.props;
			const cb = price => {
				const values = ([...this.state.values, price]).slice(-maxChartValues);
				this.setState({ values });
			};
			this.connection = dataProvider.subscribe({ cb, currency })
		},
		componentWillUnmount() {
			this.connection.close();
		}
	})
)(CryptoCurrencyChart);