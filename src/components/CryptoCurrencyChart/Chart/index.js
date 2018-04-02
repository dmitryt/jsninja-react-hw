import { compose, mapProps } from 'recompose';

import Chart from './Chart';

export default compose(
	mapProps((props) => {
		const { width, height, xValues = 10 } = props;
		let { values } = props;
		const minY = Math.min.apply(null, values);
		const maxY = Math.max.apply(null, values);
		const deltaY = maxY - minY;
		const stepY = height / (deltaY === 0 ? 1 : deltaY);
		const stepX = width / (xValues - 1);
		values = values
			.map((_, i) => {
				const x = (xValues - values.length + i) * stepX;
				const y = (maxY - values[i]) * stepY;
				return [x, y];
			})
			.reduce((acc, el) => [...acc, ...el], [])
			;
		const polygonValues = values.length === 0 ? [] : [values[0], height, ...values, values.slice(-2)[0], height];
		return { ...props, values, polygonValues };
	})
)(Chart);