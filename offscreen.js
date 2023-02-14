chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg.offscreen) {
    return;
  }
  switch (msg.type) {
    case "TZInit":
      console.log("OFFSCREEN INIT", msg.params);
  
      TrezorConnect.init(msg.params).then(() => {
        console.log("OFFSCREEN INIT RESPONSE");
        sendResponse();
      });

      break;

    case "TZGetAddress":
      console.log("OFFSCREEN GET ADDRESS", msg.params);

      TrezorConnect.ethereumGetAddress(msg.params).then((result) => {
        console.log("OFFSCREEN GET ADDRESS RESPONSE", result);
        sendResponse(result);
      });

      break;

    case "TZSignMessage":
      console.log("OFFSCREEN SIGN MESSAGE", msg.params);

      TrezorConnect.ethereumSignMessage(msg.params).then((result) => {
        console.log("OFFSCREEN SIGN MESSAGE RESPONSE", result);
        sendResponse(result);
      });

      break;
  }

  return true;
});
