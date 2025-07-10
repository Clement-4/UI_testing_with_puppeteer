const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const should = require("chai").should();
const config = require("./config");
const LoginPageModel = require("./pom/LoginPageModel.js");
require("child_process").exec;
const { mkdtempSync } = require("fs");
const { deleteFolderRecursive } = require("../utils.js");

describe("Login Page", function () {
  let browser;
  let page;
  let pageModel;

  before(async () => {
    browser = await puppeteer.launch(config.launchOptions);
  });

  it("should have the right title", async () => {
    (await pageModel.title()).should.equal("Login");
  });

  it("should persist the user", async () => {
    const userDataDir = mkdtempSync("profile");
    const options = config.launchOptions;
    options.userDataDir = userDataDir;

    let tempBrowser = await puppeteer.launch(options);
    let tempPage = await tempBrowser.newPage();

    let loginModel = new LoginPageModel(tempPage, config);

    await loginModel.go();

    (await loginModel.logState()).should.equal("Login");
    await loginModel.login(config.username, config.password);
    (await loginModel.logState()).should.equal("Logout");

    await tempBrowser.close();

    tempBrowser = await puppeteer.launch(options);
    tempPage = await tempBrowser.newPage();

    loginModel = new LoginPageModel(tempPage, config);
    await loginModel.go();

    (await loginModel.logState()).should.equal("Logout");
    await tempBrowser.close();

    deleteFolderRecursive(userDataDir);
  });

  beforeEach(async () => {
    page = await browser.newPage();
    page.setDefaultTimeout(config.timeout);
    pageModel = new LoginPageModel(page, config);
    await pageModel.go();
  });

  afterEach(async () => {
    await page.close();
  });

  after(async () => {
    await browser.close();
  });
});
