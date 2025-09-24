//blocked sites (edit this if you want to add/change)!!!
let blockedSites = [
  "opera.com"
];

// load from storage if user modified
chrome.storage.sync.get(["blockedSites"], (data) => {
  if (data.blockedSites) {
    blockedSites = data.blockedSites;
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    for (const site of blockedSites) {
      if (details.url.includes(site)) {
        return { cancel: true }; 
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
