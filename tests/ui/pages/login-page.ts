import { type Page, type Locator, expect } from "@playwright/test";
import messages from "../../utils/messages";

class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly visibleIcon: Locator;
  readonly blankUserNameMessage: Locator;
  readonly blankPasswordMessage: Locator;
  readonly invalidPopupMessage: Locator;
  readonly invalidConfirmButton: Locator;
  readonly adminRole: Locator;
  readonly employeeRole: Locator;
  readonly mainPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.getByPlaceholder("CUNET user");
    this.password = page.getByPlaceholder("ระบุรหัสผ่าน");
    this.loginButton = page.getByRole("button", { name: "เข้าสู่ระบบ" });
    this.logoutButton = page.locator("cu-epms-navbar-logout svg");
    this.adminRole = page
      .locator("p-card")
      .filter({ hasText: "Admin (ผู้ดูแลระบบ)" })
      .getByRole("img");
    this.employeeRole = page
      .locator("p-card")
      .filter({ hasText: "Employee (ผู้ใช้งานระบบ)" })
      .getByRole("img");
    this.mainPage = page.locator("#body").getByText("หน้าหลัก");
    this.blankUserNameMessage = page.getByText("โปรดระบุ CUNET");
    this.blankPasswordMessage = page.getByText("โปรดระบุรหัสผ่าน");
    this.invalidPopupMessage = page
      .locator('//*[@id="body"]/app-login/div/p-dialog/div/div/div[2]');
    this.invalidConfirmButton = page.getByRole("button", { name: "ตกลง" });
  }

  async fillUserName(userName: string) {
    await this.userName.fill(userName);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async doLogin(userName: string, password: string) {
    await this.fillUserName(userName);
    await this.fillPassword(password);
    await this.loginButton.click();
  }

  async doLogout() {
    await this.logoutButton.click();
  }

  async selectAdminRole() {
    await this.adminRole.click();
  }

  async selectEmployeeRole() {
    await this.employeeRole.click();
  }

  async checkAdminLoggedIn() {
    await expect(this.mainPage).toHaveText("หน้าหลัก");
  }

  async checkEmployeeLoggedIn() {
    await expect(this.mainPage).toHaveText("หน้าหลัก");
  }

  async checkValidateMessages() {
    await this.loginButton.click();
    await expect(this.blankUserNameMessage).toHaveText(
      messages.login.blankUserName
    );
    await expect(this.blankPasswordMessage).toHaveText(
      messages.login.blankPassword
    );
  }

  async checkInvalidCredentials() {
    await expect(this.invalidPopupMessage).toHaveText(
      messages.login.invalidPopupMessage
    );
    await this.invalidConfirmButton.click();
  }
}

export default LoginPage;
