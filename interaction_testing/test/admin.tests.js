const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const should = require("chai").should();
const config = require("./config");

describe("Admin Page", () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch(config.launchOptions);
  });

  beforeEach(async () => {
    page = await browser.newPage();
    page.setDefaultTimeout(config.timeout);
  });

  it("Should redirect to the login page, while visiting admin page without right proper authentication", async () => {
    const response = await page.goto(config.baseURL + "admin");
    response.request().redirectChain()[0].response().status().should.equal(302);
    response
      .request()
      .redirectChain()[0]
      .response()
      .url()
      .should.contain("admin");
    response.status().should.equal(200);
    response.url().should.contain("login");
  });

  afterEach(async () => {
    await page.close();
  });

  after(async () => {
    await browser.close();
  });
});
