chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "open_urls") {
      var urls = prompt("Enter the URLs (separated by commas):");
      if (urls) {
        var urlList = urls.split(",");
        urlList.forEach(function(url) {
          chrome.tabs.create({ url: url.trim() });
        });
      }
    }
  });