/*global chrome*/
const copyContent = (val) => {
    const dummy = document.createElement("input");
    dummy.style.display = "block";
    document.body.appendChild(dummy);
    dummy.setAttribute("id","dummy_id");
    dummy.setAttribute("value", val);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
};

const base64Converter = event => {
    if (event.selectionText) {
        try{
            let decodedText = atob(event.selectionText);
            chrome.storage.sync.get({openUrl: true,copyToClipboard: true},(items) => {
                if (items.copyToClipboard) {
                    copyContent(decodedText);
                }
                if (items.openUrl) {
                    window.open(decodedText);
                }
            });
        } catch(err) {
            console.log('Invalid Base64 Encode')
        }
    }
}

chrome.contextMenus.create({
    id: "base64Text",
    title: "Base64 Decode",
    contexts: ['selection'],
    onclick: base64Converter
});



// chrome.contextMenus.onClicked.addListener(content => {
//     chrome.tabs.query({active: true, currentWindow: true},tabs => {
//         switch (content.menuItemId) {
//             case 'base64Text':
//                 chrome.tabs.sendMessage(tabs[0].id. {
//                     type: 'toggle',
//                         base64Text: content
//             })
//         }
//     })
// })