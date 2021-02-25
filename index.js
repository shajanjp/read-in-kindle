const http = require("http");
const https = require("https");
const { Readability } = require("@mozilla/readability");
const { JSDOM } = require('jsdom');

function getPageContent(url) {
  const proto = url.charAt(4) === "s" ? https : http;

  return new Promise((resolve, reject) => {
    proto
      .get(url, (res) => {
        let data = "";

        res.setEncoding("utf8");
        res
          .on("data", function (chunk) {
            data += chunk;
          })
          .on("end", () => {
            resolve(data);
          });
      })
      .on("error", (e) => {
        reject(e.message);
      });
  });
}

(async () => {
    const content = await getPageContent('https://nodejs.org/api/http.html');
    const document = new JSDOM(content);
    const article = new Readability(document.window.document).parse();
})()
