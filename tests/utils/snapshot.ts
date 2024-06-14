import { Page ,test, expect} from "@playwright/test"
import path from "path";

export default {
    async toHave(name : string, page : Page) {
        await expect(page).toHaveScreenshot(name);
    }
}