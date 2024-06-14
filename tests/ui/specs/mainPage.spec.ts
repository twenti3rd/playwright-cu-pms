import { test, expect } from '@playwright/test';
import LoginPage from "../pages/login-page";
import MainPage from '../pages/mainPage';

const userName = "poweruser";
const password = "test";
let loginPage: LoginPage;
let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
  await page.goto("https://cu-pms.ayodiacompany.com/login");
  loginPage = new LoginPage(page);
  mainPage = new MainPage(page);
  await loginPage.doLogin(userName, password);
  await loginPage.selectAdminRole();
});

test.describe("check for all url",() => {
  test('yearEvaluate', async ({ page }) => {
    await mainPage.checkYearEvaluate();
  });
  test('Workload agreement cycle', async ({ page }) => {
    await mainPage.checkWorkCycle();
  });
  test('Evaluate cycle', async ({ page }) => {
    await mainPage.checkEvaluateCycle();
  });
  test('Workload', async ({ page }) => {
    await mainPage.checkWorkload();
  });
});