chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg.offscreen) {
    return;
  }

  switch (msg.target) {
    case "trezor":
      trezorApi(msg, sendResponse);
      break;

    case "lattice":
      console.error("LATTICE NOT SUPPORTED");
      break;

    default:
      console.error("NOT SUPPORTED", msg.target);
  }

  return true;
});

function trezorApi(msg, sendResponse) {
  switch (msg.topic) {
    case "init":
      console.log("TREZOR OFFSCREEN INIT", msg.params);

      chrome.runtime.sendMessage(
        {
          ...msg,
          offscreenIframe: true,
        },
        () => {
          console.log("TREZOR OFFSCREEN INIT RESPONSE");
          sendResponse();
        }
      );

      break;

    case "get-address":
      console.log("TREZOR OFFSCREEN GET ADDRESS", msg.params);

      chrome.runtime.sendMessage(
        {
          ...msg,
          offscreenIframe: true,
        },
        (response) => {
          console.log("TREZOR OFFSCREEN GET ADDRESS RESPONSE", response);
          sendResponse(response);
        }
      );

      break;

    case "sign-message":
      console.log("TREZOR OFFSCREEN SIGN MESSAGE", msg.params);

      chrome.runtime.sendMessage(
        {
          ...msg,
          offscreenIframe: true,
        },
        (response) => {
          console.log("TREZOR OFFSCREEN SIGN MESSAGE RESPONSE", response);
          sendResponse(response);
        }
      );

      break;
  }
}
