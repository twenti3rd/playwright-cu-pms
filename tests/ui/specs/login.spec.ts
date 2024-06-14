import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login-page";
import { log } from "console";

const userName = "poweruser";
const password = "test";
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  await page.goto("https://cu-pms.ayodiacompany.com/login");
  loginPage = new LoginPage(page);
});

test.describe("Login", () => {
  test("Check successful login as admin", async () => {
    await loginPage.doLogin(userName, password);
    await loginPage.selectAdminRole();
    await loginPage.checkAdminLoggedIn();
    await loginPage.doLogout();
  });

  test("Check successful login as employee", async () => {
    await loginPage.doLogin(userName, password);
    await loginPage.selectEmployeeRole();
    await loginPage.checkEmployeeLoggedIn();
    await loginPage.doLogout();
  });

  test("Check failed login - blank username and password", async () => {
    await loginPage.checkValidateMessages();
  });

  test("Check failed login - invalid username", async () => {
    const invalidUserName = "test";
    await loginPage.doLogin(invalidUserName, password);
    await loginPage.checkInvalidCredentials();
  });
});
