
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "explain-code",
    title: "Explain this code with AI ",
    contexts: ["selection"] 
  });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "explain-code" && info.selectionText) {
    
    
    chrome.storage.local.set({ selectedCode: info.selectionText }, () => {
      console.log("Code saved to storage");
    });

 
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});