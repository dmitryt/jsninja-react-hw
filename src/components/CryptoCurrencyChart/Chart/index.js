import { compose, withState, withHandlers, lifecycle, mapProps } from 'recompose';

import Chart from './Chart';

export default compose(
	mapProps(({ values, width, height, yValues = 10 }) => ({
		width,
		height,
		values: (() => {
			const minY = Math.min.apply(null, values);
			const maxY = Math.max.apply(null, values);
			const stepY = height / (maxY - minY);
			const stepX = width / (values.length - 1);
			return Array.from({ length: values.length }).reduce((acc, _, i) => {
				return [...acc, ...[i * stepX, (maxY - values[i]) * stepY]];
			}, []);
		})(),
	}))
)(Chart);