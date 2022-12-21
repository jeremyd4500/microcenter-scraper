import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.MAILTRAP_TOKEN || !process.env.MAILTRAP_TOKEN.length) {
	console.error('The environment variable `MAILTRAP_TOKEN` is undefined or invalid');
	process.exit(1);
}

if (!process.env.MAILTRAP_SENDER_EMAIL || !process.env.MAILTRAP_SENDER_EMAIL.length) {
	console.error(
		'The environment variable `MAILTRAP_SENDER_EMAIL` is undefined or invalid'
	);
	process.exit(1);
}

if (!process.env.RECIPIENT || !process.env.RECIPIENT.length) {
	console.error('The environment variable `RECIPIENT` is undefined or invalid');
	process.exit(1);
}

if (!process.env.HOURS || !process.env.HOURS.length) {
	console.warn(
		'The environment variable `HOURS` is undefined or invalid. The default hours will be used.'
	);
}

import { scrapeAndEmailResults } from './scraper';

const DEFAULT_HOURS = [9, 12, 16, 20];
const envHours = process.env.HOURS ? process.env.HOURS.split(',') : [];
const hoursToCheck = envHours
	.filter((hourStr) => hourStr.length && !isNaN(Number(hourStr.trim())))
	.map((hourStr) => Number(hourStr));

setInterval(() => {
	const date = new Date();
	const year = date.getFullYear();
	const month = `0 ${date.getMonth() + 1}`.slice(-2);
	const day = `0 ${date.getDate()}`.slice(-2);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	if (hoursToCheck && hoursToCheck.length) {
		if (hoursToCheck.includes(hours)) {
			console.log(
				`${year}-${month}-${day} ${hours}:${minutes}:${seconds} -> Checking for inventory`
			);
			scrapeAndEmailResults();
		}
	} else {
		if (DEFAULT_HOURS.includes(hours)) {
			console.log(
				`${year}-${month}-${day} ${hours}:${minutes}:${seconds} -> Checking for inventory`
			);
			scrapeAndEmailResults();
		}
	}
}, 60 * 60 * 1000);
