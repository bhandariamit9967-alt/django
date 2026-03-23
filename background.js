chrome.runtime.onMessage.addListener(((request, sender, sendResponse) => {
   if(request.action === 'getTabInfo'){
    chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
     if(tabs[0]){
        sendResponse({ tab: tabs[0]})
     }
    });
    return true;
   }
}))