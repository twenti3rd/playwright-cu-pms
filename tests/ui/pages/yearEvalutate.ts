import { type Page, type Locator, expect } from "@playwright/test";
import messages from "../../utils/messages";

export class YearEvalutate {
  readonly page: Page;
  readonly pageLink: Locator;
  readonly watchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageLink = page.getByText('ปีและรอบการประเมิน').nth(3);
    this.watchButton =  page.getByRole('menuitem', { name: 'ดู' }).locator('div').nth(2);
  }
  
  async clickLink() {
    await this.pageLink.click();
  }

  async selectRowWatch( rowName:string) {
    await this.page.getByRole('row', { name: rowName }).getByRole('button').click();
    await this.watchButton.click();
  }
  
}

export default YearEvalutate;
