import { Server } from 'mock-socket';
import { CryptoDataProvider } from './cryptoDataProvider';

describe('Service CryptoDataProvider', () => {
	const url = 'ws://someurl.com:8080';
	const getServer = url => new Server(url);

	it('should send "subscribe" request during service initialization', done => {
		expect.assertions(1);

		const server = getServer(url);
		server.on('message', data => {
			expect(data).toEqual({ type: 'subscribe', currency: 'BTC' });
		});

		const service = new CryptoDataProvider({ url });
		service.subscribe({ currency: 'BTC', cb: () => { } });
		setTimeout(() => {
			server.stop(done);
		}, 100);
	});

	it('should parse incoming data correctly', done => {
		expect.assertions(1);

		const server = getServer(url);
		server.on('connection', server => {

			server.send(JSON.stringify({ currency: 'BTC', price: '2345.56' }));
		});

		const mockCb = jest.fn();
		const service = new CryptoDataProvider({ url });
		service.subscribe({ currency: 'BTC', cb: mockCb });
		setTimeout(() => {
			expect(mockCb).toHaveBeenCalledWith(2345.56);
			server.stop(done);
		}, 100);
	});

	it('should send "unsubscribe" request, when user closes the connection', done => {
		expect.assertions(1);
		let messages = [];

		const server = getServer(url);
		server.on('message', data => messages.push(JSON.parse(data)));

		const service = new CryptoDataProvider({ url });
		const connection = service.subscribe({ currency: 'BTC', cb: () => { } });
		setTimeout(() => {
			connection.close();
		}, 50);
		setTimeout(() => {
			expect(messages).toEqual([
				{ type: "subscribe", currency: "BTC" },
				{ type: "unsubscribe", currency: "BTC" },
			]);

			server.stop(done);
		}, 100);
	});
});
