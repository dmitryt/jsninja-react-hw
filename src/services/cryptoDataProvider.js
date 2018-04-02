
export class IDataProvider {
	subscribe() {
		return { close: () => { } };
	}
}

export class DummyDataProvider extends IDataProvider {
	constructor({ range, timeout = 1000 }) {
		super();
		this.range = range;
		this.timeout = timeout;
	}
	subscribe({ cb }) {
		const interval = setInterval(() => {
			const [start, end] = this.range;
			const price = parseFloat(start + Math.random() * (end - start), 10);
			cb(price);
		}, this.timeout);
		const close = () => clearInterval(interval);
		return { close };
	}
}

export class CryptoDataProvider extends IDataProvider {
	constructor({ url }) {
		super();
		this.url = url;
	}
	subscribe({ cb, currency }) {
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
		socket.addEventListener('error', () => {
			alert('Something went wrong');
		}, false);
		return {
			close() {
				send({ type: 'unsubscribe', currency });
				socket.close();
			}
		}
	}
}
