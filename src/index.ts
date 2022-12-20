import * as dotenv from 'dotenv';
dotenv.config();

import { scrapeAndEmailResults } from './scraper';

const DEFAULT_HOURS = [9, 12, 16, 20];
const envHours = process.env.HOURS ? process.env.HOURS.split(',') : [];
const hoursToCheck = envHours.map((hourStr) => Number(hourStr.trim()));

setInterval(() => {
	const date = new Date();
	const year = date.getFullYear();
	const month = `0 ${date.getMonth() + 1}`.slice(-2);
	const day = `0 ${date.getDate()}`.slice(-2);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	if (hoursToCheck && hoursToCheck.length) {
		if (hoursToCheck.includes(seconds)) {
			console.log(
				`${year}-${month}-${day} ${hours}:${minutes}:${seconds} -> Checking for inventory`
			);
			scrapeAndEmailResults();
		}
	} else {
		if (DEFAULT_HOURS.includes(seconds)) {
			console.log(
				`${year}-${month}-${day} ${hours}:${minutes}:${seconds} -> Checking for inventory`
			);
			scrapeAndEmailResults();
		}
	}
}, 60 * 60 * 1000);
