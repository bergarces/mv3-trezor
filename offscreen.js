TrezorConnect.manifest({
  email: 'email@developer.com',
  appUrl: 'webextension-app-boilerplate',
});

chrome.runtime.onMessage.addListener((msg) => {
  if (!msg.offscreen) {
    return;
  }
  switch (msg.type) {
    case "start":
      console.log('OFFSCREEN START', TrezorConnect);
      TrezorConnect.ethereumGetPublicKey({
        path: "m/44'/60'/0'/0",
        showOnTrezor: true
      });
      break;
  }
});