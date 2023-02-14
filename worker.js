async function createOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["IFRAME_SCRIPTING"],
    justification: "Load Trezor",
  });
}

createOffscreen().then(() => {
  chrome.runtime.onMessage.addListener((msg) => {
    switch (msg.type) {
      case "TZInit":
        chrome.runtime.sendMessage(
          {
            type: "TZInit",
            offscreen: true,
            params: {
              lazyLoad: true,
              manifest: {
                email: "developer@xyz.com",
                appUrl: "http://your.application.com",
              },
            },
          },
          () => {
            chrome.storage.session.set({ trezorInit: true });
          }
        );

        break;

      case "TZGetAddress":
        chrome.runtime.sendMessage(
          {
            type: "TZGetAddress",
            offscreen: true,
            params: {
              path: "m/44'/60'/0'/0/0",
              showOnTrezor: false,
            },
          },
          (response) => {
            chrome.storage.session.set({
              trezorAddress: response.payload.address,
            });
          }
        );

        break;

      case "TZSignMessage":
        chrome.runtime.sendMessage(
          {
            type: "TZSignMessage",
            offscreen: true,
            params: {
              path: "m/44'/60'/0'/0/0",
              message: "FFFFFFFF",
              hex: true,
            },
          },
          (response) => {
            chrome.storage.session.set({
              trezorSignature: response.payload.signature,
            });
          }
        );

        break;
    }
  });
});
