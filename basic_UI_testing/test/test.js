const expect = require("chai").expect;
const puppeteer = require("puppeteer");

describe("Home page", function () {
  let browser;
  let page;

  const baseURL = "https://www.packtpub.com/";
  const brandName = "Packt";
  const mainProductName = "Books";

  before(async function () {
    browser = await puppeteer.launch({ headless: false });
  });

  beforeEach(async function () {
    page = await browser.newPage();
    await page.goto(baseURL);
  });

  it("Page should have brand name", async function () {
    expect(await page.title()).to.contain(brandName);
  });

  it("Title should mention Books", async () => {
    expect(await page.title()).to.contain(mainProductName);
  });

  afterEach(async function () {
    await page.close();
  });

  after(async function () {
    await browser.close();
  });
});
