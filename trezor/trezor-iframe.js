chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg.offscreenIframe || msg.target !== 'trezor') {
    return;
  }

  switch (msg.topic) {
    case "init":
      console.log("TREZOR IFRAME INIT", msg.params);
  
      TrezorConnect.init(msg.params).then(() => {
        console.log("TREZOR IFRAME INIT RESPONSE");
        sendResponse();
      });

      break;

    case "get-address":
      console.log("TREZOR IFRAME GET ADDRESS", msg.params);

      TrezorConnect.ethereumGetAddress(msg.params).then((result) => {
        console.log("TREZOR IFRAME GET ADDRESS RESPONSE", result);
        sendResponse(result);
      });

      break;

    case "sign-message":
      console.log("TREZOR IFRAME SIGN MESSAGE", msg.params);

      TrezorConnect.ethereumSignMessage(msg.params).then((result) => {
        console.log("TREZOR IFRAME SIGN MESSAGE RESPONSE", result);
        sendResponse(result);
      });

      break;
  }

  return true;
});

console.log('TREZOR IFRAME LOADED');
