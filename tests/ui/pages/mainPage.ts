import { type Page, type Locator, expect } from "@playwright/test";
import url from "../../utils/url";

export class MainPage {
  readonly page: Page;
  readonly yearEvaluate: Locator;
  readonly workCycleButton: Locator;
  readonly evaluateCycle: Locator;
  readonly workLoadButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yearEvaluate = page.getByText('ปีและรอบการประเมิน').nth(3);
    this.workCycleButton = page.locator('#body').getByText('รอบการทำข้อตกลงภาระงาน');
    this.evaluateCycle = page.locator('#body').getByText('รอบการประเมิน', { exact: true });
    this.workLoadButton = page.locator('#body').getByText('หมวดหลักภาระงาน');
  }
  
  async checkYearEvaluate() {
    await this.yearEvaluate.click();
    await expect(this.page).toHaveURL(url.yearEvaluate);
  }

  async checkWorkCycle() {
    await this.workCycleButton.click();
    await expect(this.page).toHaveURL(url.workCycle);
  }

  async checkEvaluateCycle() {
    await this.evaluateCycle.click();
    await expect(this.page).toHaveURL(url.evaluateCycle);
  }

  async checkWorkload() {
    await this.workLoadButton.click();
    await expect(this.page).toHaveURL(url.workload);
  }
}

export default MainPage;
