import { test, expect } from '@playwright/test';
import LoginPage from "../pages/login-page";
import {YearEvalutate} from '../pages/yearEvalutate';
import snapshot from '../../utils/snapshot';


const userName = "poweruser";
const password = "test";
const rowName ="1 2567";
const snapshotName = "snapshot1.png";
let loginPage: LoginPage;
let yearEvalutate: YearEvalutate;

test.beforeEach(async ({ page }) => {
  await page.goto("https://cu-pms.ayodiacompany.com/login");
  loginPage = new LoginPage(page);
  yearEvalutate = new YearEvalutate(page);
  await loginPage.doLogin(userName, password);
  await loginPage.selectAdminRole();
});

test.describe("visual testing",() => {
  test('screenshot', async ({ page }) => {
    await yearEvalutate.clickLink();
    await yearEvalutate.selectRowWatch(rowName);
    //await expect(page).toHaveScreenshot(snapshotName);
    await snapshot.toHave(snapshotName,page);
  });
});