chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "capitalizeText",
    title: "Capitalize Text",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "convertToUppercase",
    title: "Convert to UPPERCASE",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "convertToLowercase",
    title: "Convert to lowercase",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "capitalizeText") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: capitalizeText,
    });
  } else if (info.menuItemId === "convertToLowercase") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: convertToLowercase,
    });
  } else if (info.menuItemId === "convertToUppercase") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: convertToUppercase,
    });
  }
});

chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    if (command === "convertToUppercase") {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: convertToUppercase,
      });
    } else if (command === "convertToLowercase") {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: convertToLowercase,
      });
    } else if (command === "capitalizeText") {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: capitalizeText,
      });
    }
  });
});

function capitalizeText() {
  const selection = window.getSelection().toString();
  if (selection) {
    const capitalized = selection
      .toLowerCase()
      .replace(/(^|\.\s+)([a-z])/g, function (_match, separator, char) {
        return separator + char.toUpperCase();
      });
    document.execCommand("insertText", false, capitalized);
  }
}

function convertToUppercase() {
  const selection = window.getSelection().toString();
  if (selection) {
    document.execCommand("insertText", false, selection.toUpperCase());
  }
}

function convertToLowercase() {
  const selection = window.getSelection().toString();
  if (selection) {
    document.execCommand("insertText", false, selection.toLowerCase());
  }
}
