import { test, expect } from "@playwright/test";

test(`Check successful login`, async ({ page }) => {
  await page.goto("https://cu-pms.ayodiacompany.com/login");
  await page.getByPlaceholder("CUNET user").click();
  await page.getByPlaceholder("CUNET user").fill("poweruser");
  await page.getByPlaceholder("ระบุรหัสผ่าน").click();
  await page.getByPlaceholder("ระบุรหัสผ่าน").fill("test");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await page
    .locator("p-card")
    .filter({ hasText: "Admin (ผู้ดูแลระบบ)" })
    .getByRole("img")
    .click();
  await page.locator("#body").getByText("หน้าหลัก").click();
});


