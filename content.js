browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "fetchHtml") {
        fetchHtml(request.url);
    }
});

function fetchHtml(url) {
    fetch("https://origins.galaxycrow.de/raw?url=" + url)
        .then(response => response.text())
        .then(html => extractTextFromHtml(html))
        .then(text => insertHtml(text))
        .catch(error => console.error(error));
}

function extractTextFromHtml(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const paragraphs = doc.querySelectorAll("p");
    for (const p of paragraphs) {
        if (p.textContent.includes("RP:")) {
            return p.textContent.replace("RP:", "RP-Punkte:");
        }
    }
    return null;
}

function insertHtml(text) {
  setTimeout(() => {
    const h5 = document.createElement("h5");
    h5.textContent = text;
    const h5Elements = document.querySelectorAll("h5");

    let gangH5 = null;
    for (const h5Element of h5Elements) {
      if (h5Element.textContent.includes("Gang:")) {
        gangH5 = h5Element;
        break;
      }
      if (h5Element.textContent.includes("Geld (Bank):")) {
        gangH5 = h5Element;
      }
    }

    if (gangH5) {
      const container = gangH5.parentNode;
      container.insertBefore(h5, gangH5.nextSibling);
    } else {
      console.error("Header not found");
    }
  }, 50);
}