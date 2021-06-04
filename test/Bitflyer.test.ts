import Bitflyer from '../src/controllers/Bitflyer';

test('timestampToISO8601', () => {
	const testDate = '2021-06-03T20:45:29.123';
	const dateStr: string = Bitflyer.timestampToISO8601(testDate);
	expect(dateStr).toBe('2021-06-03T20:45:29.123+09:00');
});

test('truncateTimestamp w/ duration="second"', () => {
	const testDate = '2021-06-03T20:45:29.123';
	const truncatedDate: string = Bitflyer.truncateTimestamp(testDate, 'second');
	expect(truncatedDate).toBe('2021-06-03T20:45:29.000+09:00');
});

test('truncateTimestamp w/ duration="minute"', () => {
	const testDate = '2021-06-03T20:45:29.123';
	const truncatedDate: string = Bitflyer.truncateTimestamp(testDate, 'minute');
	expect(truncatedDate).toBe('2021-06-03T20:45:00.000+09:00');
});

test('truncateTimestamp w/ duration="hour"', () => {
	const testDate = '2021-06-03T20:45:29.123';
	const truncatedDate: string = Bitflyer.truncateTimestamp(testDate, 'hour');
	expect(truncatedDate).toBe('2021-06-03T20:00:00.000+09:00');
});

test('truncateTimestamp w/ duration="day"', () => {
	const testDate = '2021-06-03T20:45:29.123';
	const truncatedDate: string = Bitflyer.truncateTimestamp(testDate, 'day');
	expect(truncatedDate).toBe('2021-06-03T00:00:00.000+09:00');
});
