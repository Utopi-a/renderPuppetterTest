import puppeteer from "puppeteer";
import chrome from "@sparticuz/chromium";

(async () => {
  // ブラウザを起動
  const browser =
    process.env.NODE_ENV === "production"
      ? await puppeteer.launch({
          args: chrome.args,
          executablePath: await chrome.executablePath(),
          headless: chrome.headless,
        })
      : await puppeteer.launch({});

  try {
    // 新しいページを開く
    const page = await browser.newPage();

    // Googleのトップページに移動
    await page.goto("https://www.google.com");

    // スクリーンショットを撮影
    const screenshot = await page.screenshot({
      fullPage: true,
    });

    // スクリーンショットの情報を表示
    console.log(`スクリーンショットの容量: ${screenshot.length} bytes`);

    // ページの寸法を取得
    const dimensions = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      };
    });

    console.log(`解像度: ${dimensions.width}x${dimensions.height}px`);
  } catch (error) {
    console.error("エラーが発生しました:", error);
  } finally {
    // ブラウザを終了
    await browser.close();
  }
})();
