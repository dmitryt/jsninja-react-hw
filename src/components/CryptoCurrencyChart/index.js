import { compose, lifecycle } from 'recompose';

import CryptoService from '../../services/cryptoService';

import CryptoCurrencyChart from './CryptoCurrencyChart';

export default compose(
	lifecycle({
		state: { values: [] },
		componentDidMount() {
			const { url, currency, maxChartValues } = this.props;
			const service = new CryptoService({ url, currency });
			this.connection = service.subscribe(price => {
				const values = ([...this.state.values, price]).slice(-maxChartValues);
				this.setState({ values });
			});
		},
		componentWillUnmount() {
			this.connection.close();
		}
	})
)(CryptoCurrencyChart);