document.addEventListener("DOMContentLoaded", async function() {
    var openURLsBtn = document.getElementById("openURLsBtn");
    openURLsBtn.addEventListener("click", openURLs);
  
    var clearURLsBtn = document.getElementById("clearURLsBtn");
    clearURLsBtn.addEventListener("click", clearURLs);
  
    var savedUrls = await getSavedURLs();
    var urlsInput = document.getElementById("urlsInput");
    urlsInput.value = savedUrls || "";
  });
  
  function openURLs() {
    var urlsInput = document.getElementById("urlsInput");
    var urls = urlsInput.value.trim().split("\n");
    if (urls.length > 0) {
      chrome.runtime.sendMessage({ action: "open_urls", urls: urls });
    }
  }
  
  function getSavedURLs() {
    return new Promise(function(resolve) {
      chrome.storage.local.get("urls", function(result) {
        resolve(result.urls);
      });
    });
  }
  
  function saveURLs(urls) {
    chrome.storage.local.set({ urls: urls });
  }
  
  function clearURLs() {
    saveURLs("");
    var urlsInput = document.getElementById("urlsInput");
    urlsInput.value = "";
  }
  
  var addURLBtn = document.getElementById("addURLBtn");
  addURLBtn.addEventListener("click", function() {
    var newURLInput = document.getElementById("newURLInput");
    var newURL = newURLInput.value.trim();
    if (newURL !== "") {
      getSavedURLs().then(function(savedUrls) {
        var updatedUrls = savedUrls ? savedUrls + "\n" + newURL : newURL;
        saveURLs(updatedUrls);
        var urlsInput = document.getElementById("urlsInput");
        urlsInput.value = updatedUrls;
        newURLInput.value = "";
      });
    }
  });