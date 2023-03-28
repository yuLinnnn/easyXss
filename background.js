chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "xssMenu",
    "title": "XSS选项",
    "contexts": ["editable"]
  });
});
