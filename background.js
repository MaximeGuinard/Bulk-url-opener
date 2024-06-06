chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "open_urls") {
      var urls = request.urls;
      urls.forEach(function(url) {
        chrome.tabs.create({ url: url.trim(), active: false });
      });
    }
  });