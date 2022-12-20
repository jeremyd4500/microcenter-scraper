/* eslint-disable no-console */
const { MailtrapClient } = require('mailtrap');

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = 'https://send.api.mailtrap.io/';

export const sendEmail = async (emailText: string) => {
	try {
		const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

		const sender = {
			email: process.env.MAILTRAP_SENDER_EMAIL,
			name: 'Microcenter Inventory'
		};
		const recipients = [
			{
				email: process.env.RECIPENT
			}
		];

		await client.send({
			from: sender,
			to: recipients,
			subject: 'Microcenter Store Availability',
			text: emailText,
			category: 'Updates'
		});
	} catch (error) {
		console.error(error);
	}
};
