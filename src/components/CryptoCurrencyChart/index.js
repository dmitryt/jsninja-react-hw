import { compose, withState, withHandlers, lifecycle, mapProps } from 'recompose';

import { cryptoService } from '../../services';

import CryptoCurrencyChart from './CryptoCurrencyChart';

export default compose(
	// lifecycle({
	// 	componentDidMount() {
	// 		const service = cryptoService.init({
	// 			url: 'ws://coins-stream.demo.javascript.ninja',
	// 			currency: 'BTC',
	// 		});
	// 		this.connection = service.subscribe(() => {

	// 		});
	// 	},

	// 	componentWillUnmount() {
	// 		this.connection.close();
	// 	}
	// })
)(CryptoCurrencyChart);