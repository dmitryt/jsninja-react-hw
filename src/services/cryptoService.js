
class CryptoService {
	constructor({ url, currency }) {
		this.url = url;
		this.currency = currency;
	}
	subscribe(cb) {
		const currency = this.currency;
		const socket = new WebSocket(this.url);
		const send = data => socket.send(JSON.stringify(data));
		socket.addEventListener('open', () => {
			send({ type: 'subscribe', currency });
		}, false);
		socket.addEventListener('message', e => {
			try {
				const { price } = JSON.parse(e.data);
				if (!isNaN(price)) {
					cb(parseFloat(price, 10));
				}
			} catch (e) { }
		}, false);
		return {
			close() {
				send({ type: 'unsubscribe', currency });
				socket.close();
			}
		}
	}
}

export default CryptoService;