chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleEva') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      }, () => {
        chrome.scripting.insertCSS({
          target: { tabId: tab.id },
          files: ['content.css']
        }, () => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
              window.postMessage({ type: 'EVA_TOGGLE' }, '*');
            }
          });
        });
      });
    });
    sendResponse({ success: true });
  }
 
  if (request.action === 'getStatus') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          return !!document.getElementById('nerv-hud-root');
        }
      }, (results) => {
        sendResponse({ active: results && results[0] && results[0].result });
      });
    });
    return true;
  }
});