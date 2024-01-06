chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
        if (request !== 'getJiraInfo') {
            return;
        }
        
        // TODO: Change Link
        const PERSONAL_LINK = '<a href="https://confluence.vrpconsulting.com/display/~ivan.gordeychik" userkey="cdc8067577b97d44017891cdc9520037" data-base-url="https://confluence.vrpconsulting.com" data-linked-resource-type="userinfo" data-linked-resource-default-alias="Ivan Gordeychik" class="confluence-link">Ivan Gordeychik</a>'
      
        let issueLink = document.querySelector('#jira-issue-header ol div[data-testid="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"]:last-child a').href;
        let issueNumber = issueLink.replace("https://vrpconsulting.atlassian.net/browse/", "");
        let issueName = document.querySelector('#jira-issue-header + div h1').innerText;
        let prLink;
        document.querySelectorAll('a').forEach(item => {
            if (!prLink && item.href.includes('merge_request')) {
                prLink = item.href;
            }
        })
        let prNumber = prLink.replace("https://repository.vrpconsulting.com/tatyana.agurkova/yocova-dx/-/merge_requests/", "").replace("/diffs", "").replace("/pipelines", '');
        let htmlInfo = '<table><tbody><tr>';
        htmlInfo += `<td><a href="${issueLink}">${issueNumber}</a></td>`;
        htmlInfo += `<td>${issueName}</td>`;
        htmlInfo += `<td>${PERSONAL_LINK}</td>`;
        htmlInfo += `<td><a href="${prLink}">${prNumber}</a></td>`;
        htmlInfo += `<td>-</td>`;
        htmlInfo += `<td>-</td>`;
        htmlInfo += `<td>-</td>`;
        htmlInfo += `<td>-</td>`;
        htmlInfo += `<td>-</td>`;
        htmlInfo += '</tr></tbody</table>';
        htmlInfo = htmlInfo.replaceAll("<td>", "<td class='highlight-#ffebe6'>");
       
        if (!issueName || !htmlInfo) {
            throw new Error('');
        }

        sendResponse(htmlInfo)
    }
);


