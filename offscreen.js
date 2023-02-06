TrezorConnect.init({
  lazyLoad: true, // this param will prevent iframe injection until TrezorConnect.method will be called
  manifest: {
    email: "developer@xyz.com",
    appUrl: "http://your.application.com",
  },
});

chrome.runtime.onMessage.addListener(async (msg) => {
  if (!msg.offscreen) {
    return;
  }
  switch (msg.type) {
    case "getAddressRequest":
      console.log("OFFSCREEN GET ADDRESS");
      
      const result = await TrezorConnect.ethereumGetAddress({
        path: "m/44'/60'/0'/0/0",
        showOnTrezor: false,
      });
    
      console.log("TREZOR RESULT", result);
    
      await chrome.runtime.sendMessage({
        type: "getAddressResponse",
        payload: result,
      });

      break;
  }
});
