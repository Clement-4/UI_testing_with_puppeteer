const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const should = require("chai").should();

async function sleep(time) {
  return new Promise((resolve) => {
    console.log(`Sleeping for ${time} ms`);
    setTimeout(resolve, time);
  });
}

describe("tic-tac-toe Test", function () {
  let browser;
  let page;

  before(async function () {
    browser = await puppeteer.launch({ headless: false });
  });

  beforeEach(async function () {
    page = await browser.newPage();
    page.setDefaultTimeout(50000);
    await page.goto("http://localhost:5173/");
  });

  it("should play", async function () {
    await page.click(`[aria-label="cell-0"]`);
    await page.click(`[aria-label="cell-1"]`);
    await page.click(`[aria-label="cell-4"]`);
    await page.click(`[aria-label="cell-5"]`);
    await page.click(`[aria-label="cell-8"]`);

    expect(
      await page.$eval(".status", (status) => status.innerHTML)
    ).to.contain("Player X wins!");
  });

  afterEach(async function () {
    await page.close();
  });

  after(async function () {
    await browser.close();
  });
});
