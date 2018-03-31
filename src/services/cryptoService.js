
class CryptoService {
	constructor({url, currency}) {
		this.socket = new WebSocket(url);
		this.currency = currency;
	}
	subscribe(cb) {
		const currency = this.currency;
		this.socket.addEventListener('open', () => {
			this.socket.send({ type: 'subscribe', currency });
		}, false);
		this.socket.addEventListener('message', cb, false)
		return {
			close() {
				this.socket.send({ type: 'unsubscribe', currency });
			}
		}
	}
}

export default CryptoService;