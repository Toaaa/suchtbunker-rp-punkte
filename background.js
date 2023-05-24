browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        const url = new URL(tab.url);
        if (url.hostname == "portal.suchtbunker.de" && url.searchParams.has("s")) {
            const steamId = url.searchParams.get("s");
            const externalUrl = "https://util.suchtbunker.de/gmod_load/darkrp/index.php?s=" + steamId;
            browser.tabs.sendMessage(tabId, { action: "fetchHtml", url: externalUrl });
        }
    }
});
