module.exports = {
  local: {
    baseURL: "http://192.168.1.33:8080/",
    username: "admin@gmail.com",
    password: "admin",
    launchOptions: { headless: false },
    timeout: 50000,
  },
  CI: {
    baseURL: "http://localhost:8080/",
    username: "admin@gmail.com",
    password: "admin",
    launchOptions: {
      executablePath: process.env.PUPPETEER_EXEC_PATH,
      headless: "new",
      args: ["--no-sandbox"],
    },
    timeout: 50000,
  },
  prod: {},
}[process.env.TESTENV || "local"];
