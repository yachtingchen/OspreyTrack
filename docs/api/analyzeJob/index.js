// npm i cheerio 之後才能用（見下方）
const cheerio = require("cheerio");

module.exports = async function (context, req) {
    try {
        const url = req.body?.url;
        if (!url) {
            context.res = { status: 400, jsonBody: { error: "Missing url" } };
            return;
        }

        // 基本防呆：只允許 http/https
        if (!/^https?:\/\//i.test(url)) {
            context.res = { status: 400, jsonBody: { error: "Invalid url" } };
            return;
        }

        const r = await fetch(url, {
            headers: { "user-agent": "Mozilla/5.0" }
        });

        if (!r.ok) {
            context.res = { status: 502, jsonBody: { error: "Fetch failed", status: r.status } };
            return;
        }

        const html = await r.text();
        const $ = cheerio.load(html);
        const title = ($("title").text() || "").trim();

        // 先回傳最穩的：title + 原始url
        context.res = {
            status: 200,
            jsonBody: { url, title }
        };
    } catch (e) {
        context.res = { status: 500, jsonBody: { error: "Server error" } };
    }
};
