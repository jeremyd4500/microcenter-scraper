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

const date = new Date();
log('App starting up', date);
const hoursToCheck = getHoursToCheck();
log('Hours of the day to check for in-store inventory: ' + hoursToCheck.toString(), date);

setInterval(() => {
	const date = new Date();
	const currentHour = date.getHours();

	if (hoursToCheck.includes(currentHour)) {
		log('Checking for in-store inventory', date);
		scrapeAndEmailResults();
	} else {
		log('Waiting for one of the specified hour(s) of the day', date);
	}
}, 60 * 60 * 1000);

function getHoursToCheck(): number[] {
	const DEFAULT_HOURS = [9, 12, 16, 20];
	const envHours = process.env.HOURS ? process.env.HOURS.split(',') : [];
	const numericEnvHours = envHours
		.filter((hourStr) => hourStr.length && !isNaN(Number(hourStr.trim())))
		.map((hourStr) => Number(hourStr));
	if (numericEnvHours.length) {
		return numericEnvHours;
	}
	return DEFAULT_HOURS;
}

function log(message: string, dateObj?: Date) {
	const date = dateObj ? dateObj : new Date();
	const year = date.getFullYear();
	const month = `0 ${date.getMonth() + 1}`.slice(-2);
	const day = `0 ${date.getDate()}`.slice(-2);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds} -> ${message}`);
}
