chrome.action.onClicked.addListener(e=>{chrome.tabs.sendMessage(e.id,{action:"toggleSidebar"})});
