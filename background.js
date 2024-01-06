// When the user clicks on the extension action

chrome.action.onClicked.addListener(async (tab) => {
    // TODO: create condition to execute action only for Jira Ticket page
    if (true) {
        try {
            let win = await chrome.windows.getLastFocused();
            await chrome.windows.update(win.id, {"focused" : true})
            await chrome.tabs.sendMessage(tab.id, 'getJiraInfo', (response) => {
                 chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: writeToClipboard,
                    args: [response]
                });

            });
            chrome.action.setBadgeText({text: 'Copied!'})
        } catch (ex) {
            chrome.action.setBadgeText({text: 'Error'})
        } finally {
            setTimeout(() => chrome.action.setBadgeText({text: ''}), 10000)
        }
    }
});

function writeToClipboard(response) {
    const blobHtml = new Blob([response], {type: "text/html"});
    const blobText = new Blob([response], {type: "text/plain"});
    const data = [new ClipboardItem({
        ["text/plain"]: blobText,
        ["text/html"]: blobHtml,
    })];
    navigator.clipboard.write(data)
}

