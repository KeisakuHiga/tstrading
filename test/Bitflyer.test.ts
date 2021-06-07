import Bitflyer from '../src/controllers/Bitflyer';
import Candle from '../src/models/Candle';
import Locals from '../src/providers/Locals';
import moment from 'moment';

jest.useFakeTimers();

test('timestampToISO8601', () => {
	const testDate = moment.utc('2021-06-03T20:45:29.123Z');
	const dateStr: string = Bitflyer.timestampToISO8601(testDate);
	expect(dateStr).toBe('2021-06-03T20:45:29.123Z');
});

test('truncateTimestamp w/ duration="second"', () => {
	const testDate = moment.utc('2021-06-03T20:45:29.123Z');
	const truncatedDate: moment.Moment = Bitflyer.truncateTimestamp(
		testDate,
		'second',
	);
	expect(JSON.stringify(truncatedDate)).toBe(
		JSON.stringify('2021-06-03T20:45:29.000Z'),
	);
});

test('truncateTimestamp w/ duration="minute"', () => {
	const testDate = moment.utc('2021-06-03T20:45:29.123Z');
	const truncatedDate: moment.Moment = Bitflyer.truncateTimestamp(
		testDate,
		'minute',
	);
	expect(JSON.stringify(truncatedDate)).toBe(
		JSON.stringify('2021-06-03T20:45:00.000Z'),
	);
});

test('truncateTimestamp w/ duration="hour"', () => {
	const testDate = moment.utc('2021-06-03T20:45:29.123Z');
	const truncatedDate: moment.Moment = Bitflyer.truncateTimestamp(
		testDate,
		'hour',
	);
	expect(JSON.stringify(truncatedDate)).toBe(
		JSON.stringify('2021-06-03T20:00:00.000Z'),
	);
});

test('truncateTimestamp w/ duration="day"', () => {
	const testDate = moment.utc('2021-06-03T20:45:29.123Z');
	const truncatedDate: moment.Moment = Bitflyer.truncateTimestamp(
		testDate,
		'day',
	);
	expect(JSON.stringify(truncatedDate)).toBe(
		JSON.stringify('2021-06-03T00:00:00.000Z'),
	);
});

test('getCandle w/ duration="2021-06-01T03:30:14.123Z"', async () => {
	const productCode = Locals.config().productCodes[0];
	const duration = 'second';
	const testDate = moment.utc('2021-06-01T03:30:14.123Z');
	const currentCandle = await Candle.getCandle(productCode, duration, testDate);
	expect(currentCandle.open).toBe(4322910);
});
