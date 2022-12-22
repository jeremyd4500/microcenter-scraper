import playwright, { Browser, Page } from 'playwright';
import { sendEmail } from './emailer';

let browser: Browser;
let page: Page;

const STORE_URLS = [
	'https://www.microcenter.com/product/649991/inland-tn436-1tb-3d-tlc-nand-pcie-gen-4-x4-nvme-m2-2230-internal-ssd-compatible-with-microsoft-surface-and-steam-deck?storeid=041',
	'https://www.microcenter.com/product/649991/inland-tn436-1tb-3d-tlc-nand-pcie-gen-4-x4-nvme-m2-2230-internal-ssd-compatible-with-microsoft-surface-and-steam-deck?storeid=065'
];

const init = async () => {
	browser = await playwright.chromium.launch({
		headless: true
	});

	page = await browser.newPage();
};

const checkStoreForInventory = async (storeURL: string): Promise<string> => {
	await page.goto(storeURL);
	const texts = await page.locator('div#pnlInventory').allInnerTexts();
	return texts.join();
};

export const scrapeAndEmailResults = async () => {
	let output = '';

	await init();

	for (let i = 0; i < STORE_URLS.length; i++) {
		const storeInventory = await checkStoreForInventory(STORE_URLS[i]);
		output += storeInventory + '\n';
	}

	await browser.close();

	await sendEmail(output);
};
