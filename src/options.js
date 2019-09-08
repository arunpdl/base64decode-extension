save_options = () => {
    const openNewTabOption = document.getElementById("openUrl").checked;
    const copyToClipboardOption = document.getElementById("copyClipboard").checked;
    chrome.storage.sync.set({
        openUrl: openNewTabOption,
        copyToClipboard: copyToClipboardOption
    }, () => {
    const status = document.getElementById("status");
    status.textContent = "Options saved!";
    setTimeout(() => {
        status.textContent = "";
    }, 1000)
    });
};

restore_options = () => {
    chrome.storage.sync.get({
        openUrl: true,
        copyToClipboard: true
    }, (items) => {
        document.getElementById("openUrl").checked = items.openUrl;
        document.getElementById("copyClipboard").checked = items.copyToClipboard;
    })
};

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById('save').addEventListener('click', save_options);